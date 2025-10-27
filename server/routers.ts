import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContact, getAllContacts } from "./db";
import { sendEmail } from "./gmail";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "名前を入力してください"),
          email: z.string().email("有効なメールアドレスを入力してください"),
          subject: z.string().min(1, "件名を入力してください"),
          message: z.string().min(1, "メッセージを入力してください"),
        })
      )
      .mutation(async ({ input }) => {
        // Save to database
        await createContact(input);
        
        // Send email notification
        const emailContent = `新しいお問い合わせが届きました。\n\n名前: ${input.name}\nメールアドレス: ${input.email}\n件名: ${input.subject}\n\nメッセージ:\n${input.message}`;
        
        await sendEmail({
          to: "hina.terasaki@gate-agency.com",
          subject: `[お問い合わせ] ${input.subject}`,
          content: emailContent,
        });
        
        return { success: true };
      }),
    
    list: publicProcedure.query(async () => {
      return await getAllContacts();
    }),
  }),
});

export type AppRouter = typeof appRouter;

