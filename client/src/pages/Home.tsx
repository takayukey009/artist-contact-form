import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Music, Send, Mail } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("お問い合わせを送信しました", {
        description: "ご連絡ありがとうございます。担当者より折り返しご連絡いたします。",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error) => {
      toast.error("送信に失敗しました", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Artist Contact</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-xl text-purple-200">
              お問い合わせはこちらから。あなたのメッセージをお待ちしています。
            </p>
          </div>

          {/* Contact Form Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl text-white flex items-center gap-2">
                <Mail className="w-7 h-7 text-purple-400" />
                Contact Form
              </CardTitle>
              <CardDescription className="text-purple-200 text-base">
                下記フォームに必要事項をご記入の上、送信してください。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white text-base">
                    お名前 *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="山田 太郎"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-base">
                    メールアドレス *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white text-base">
                    件名 *
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="お問い合わせの件名"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white text-base">
                    メッセージ *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="お問い合わせ内容をご記入ください"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  {submitMutation.isPending ? (
                    "送信中..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      送信する
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 backdrop-blur-sm bg-black/20 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-purple-200">
          <p>&copy; 2025 Artist Contact. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

