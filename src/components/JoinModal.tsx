import { useState } from "react";
import Icon from "@/components/ui/icon";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "offer" | "form" | "paying";

const PAYMENT_URL = "https://functions.poehali.dev/162cbdda-165c-406f-a7ee-9625222bfae8";

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [step, setStep] = useState<Step>("offer");
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setStep("offer");
    setOfferAccepted(false);
    setForm({ name: "", phone: "", email: "" });
    setError("");
    onClose();
  };

  const handlePay = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Пожалуйста, заполните имя и телефон");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(PAYMENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          return_url: window.location.href + "?payment=success",
        }),
      });
      const data = await res.json();
      if (data.confirmation_url) {
        setStep("paying");
        window.location.href = data.confirmation_url;
      } else {
        setError("Ошибка при создании платежа. Попробуйте ещё раз.");
      }
    } catch {
      setError("Ошибка соединения. Проверьте интернет и попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-[#f7f3ec] rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#2d5a35]/10">
          <div>
            <div className="text-[10px] font-body tracking-widest uppercase text-[#c9963a] mb-0.5">
              {step === "offer" ? "Шаг 1 из 2" : step === "form" ? "Шаг 2 из 2" : "Оплата"}
            </div>
            <h2 className="font-display text-xl text-[#1a2e1e] font-semibold">
              {step === "offer" && "Договор оферты"}
              {step === "form" && "Ваши данные"}
              {step === "paying" && "Переход к оплате…"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2d5a35]/10 transition-colors"
          >
            <Icon name="X" size={16} className="text-[#5a7060]" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex px-7 pt-4 gap-2">
          {(["offer", "form"] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                step === "offer" && i === 0
                  ? "bg-[#c9963a]"
                  : step === "form" || step === "paying"
                  ? "bg-[#c9963a]"
                  : "bg-[#2d5a35]/15"
              } ${step === "form" && i === 1 ? "bg-[#c9963a]" : step === "offer" && i === 1 ? "bg-[#2d5a35]/15" : ""}`}
            />
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {step === "offer" && (
            <div>
              <div className="bg-white rounded-xl border border-[#2d5a35]/10 p-5 text-[#5a7060] font-body text-xs leading-relaxed space-y-3 max-h-64 overflow-y-auto mb-5">
                <p className="font-semibold text-sm text-[#1a2e1e]">
                  Публичная оферта о вступлении в НПК «Подъполье»
                </p>
                <p>
                  Настоящая публичная оферта (далее — Оферта) является предложением Народного
                  потребительского кооператива «Подъполье» (далее — Кооператив) заключить договор
                  о членстве на условиях, изложенных ниже.
                </p>
                <p className="font-medium text-[#1a2e1e]">1. Предмет оферты</p>
                <p>
                  Кооператив принимает в члены физических лиц, достигших 18 лет, на основании
                  заявления и внесения вступительного взноса в размере 1 500 (Одна тысяча пятьсот)
                  рублей.
                </p>
                <p className="font-medium text-[#1a2e1e]">2. Порядок вступления</p>
                <p>
                  Акцептом настоящей оферты является оплата вступительного взноса. С момента
                  зачисления средств заявитель считается принятым в члены Кооператива и
                  приобретает все права и обязанности пайщика в соответствии с Уставом.
                </p>
                <p className="font-medium text-[#1a2e1e]">3. Права пайщика</p>
                <p>
                  Пайщик вправе: участвовать в управлении Кооперативом через общее собрание;
                  пользоваться услугами Кооператива; получать информацию о деятельности
                  Кооператива; выйти из Кооператива с возвратом паевого взноса в установленном
                  порядке.
                </p>
                <p className="font-medium text-[#1a2e1e]">4. Обязанности пайщика</p>
                <p>
                  Пайщик обязан: соблюдать Устав Кооператива; своевременно вносить взносы;
                  не разглашать конфиденциальную информацию; участвовать в общих собраниях.
                </p>
                <p className="font-medium text-[#1a2e1e]">5. Вступительный и паевой взносы</p>
                <p>
                  Вступительный взнос — 1 500 руб., уплачивается однократно при вступлении,
                  возврату не подлежит. Минимальный паевой взнос устанавливается решением
                  общего собрания.
                </p>
                <p className="font-medium text-[#1a2e1e]">6. Персональные данные</p>
                <p>
                  Акцептируя оферту, вы соглашаетесь на обработку персональных данных
                  Кооперативом в целях ведения реестра пайщиков в соответствии с ФЗ-152.
                </p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={offerAccepted}
                  onChange={(e) => setOfferAccepted(e.target.checked)}
                  className="mt-0.5 accent-[#2d5a35] w-4 h-4 flex-shrink-0"
                />
                <span className="font-body text-xs text-[#5a7060] leading-relaxed">
                  Я ознакомился(ась) с условиями оферты и согласен(а) на обработку персональных
                  данных
                </span>
              </label>
            </div>
          )}

          {step === "form" && (
            <div className="space-y-4">
              <p className="font-body text-sm text-[#5a7060] mb-2">
                Заполните данные — они будут указаны в платеже и занесены в реестр пайщиков.
              </p>
              <div>
                <label className="block font-body text-xs text-[#5a7060] mb-1 tracking-wide">
                  Имя и фамилия *
                </label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full font-body text-sm bg-white border border-[#2d5a35]/20 rounded-lg px-4 py-3 outline-none focus:border-[#c9963a] transition-colors text-[#1a2e1e] placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block font-body text-xs text-[#5a7060] mb-1 tracking-wide">
                  Телефон *
                </label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full font-body text-sm bg-white border border-[#2d5a35]/20 rounded-lg px-4 py-3 outline-none focus:border-[#c9963a] transition-colors text-[#1a2e1e] placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block font-body text-xs text-[#5a7060] mb-1 tracking-wide">
                  Email (для квитанции)
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full font-body text-sm bg-white border border-[#2d5a35]/20 rounded-lg px-4 py-3 outline-none focus:border-[#c9963a] transition-colors text-[#1a2e1e] placeholder:text-gray-400"
                />
              </div>
              {error && (
                <p className="text-red-500 font-body text-xs">{error}</p>
              )}
              <div className="bg-[#2d5a35]/5 rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="font-body text-sm text-[#5a7060]">Вступительный взнос</span>
                <span className="font-display text-xl text-[#1a2e1e] font-semibold">1 500 ₽</span>
              </div>
            </div>
          )}

          {step === "paying" && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="w-14 h-14 rounded-full bg-[#c9963a]/15 flex items-center justify-center">
                <Icon name="CreditCard" size={28} className="text-[#c9963a]" />
              </div>
              <p className="font-body text-[#5a7060] text-sm text-center">
                Переходим на страницу оплаты ЮKassa…
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "paying" && (
          <div className="px-7 py-5 border-t border-[#2d5a35]/10 flex gap-3">
            {step === "form" && (
              <button
                onClick={() => setStep("offer")}
                className="flex-1 border border-[#2d5a35]/30 text-[#2d5a35] font-body font-semibold py-3 rounded-lg hover:bg-[#2d5a35]/5 transition-colors text-sm"
              >
                Назад
              </button>
            )}
            <button
              onClick={() => {
                if (step === "offer") setStep("form");
                else handlePay();
              }}
              disabled={step === "offer" ? !offerAccepted : loading}
              className="flex-1 bg-[#1a2e1e] hover:bg-[#c9963a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-body font-semibold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
              {loading && <Icon name="Loader2" size={16} className="animate-spin" />}
              {step === "offer" && "Принимаю оферту →"}
              {step === "form" && (loading ? "Создаём платёж…" : "Оплатить 1 500 ₽")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
