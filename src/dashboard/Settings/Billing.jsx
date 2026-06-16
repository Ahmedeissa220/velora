import { useState } from "react";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    desc: "Perfect for getting started",
    icon: Zap,
    color: "from-slate-500 to-slate-600",
    features: [
      "Basic dashboard",
      "1 store",
      "Limited analytics",
      "Email support",
      "100 products",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    desc: "For growing businesses",
    icon: Sparkles,
    color: "from-blue-500 to-indigo-600",
    features: [
      "Everything in Starter",
      "Unlimited products",
      "Advanced analytics",
      "AI-powered tools",
      "Priority support",
      "Custom domain",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    desc: "For large-scale operations",
    icon: Crown,
    color: "from-amber-500 to-orange-600",
    features: [
      "Everything in Pro",
      "Multi-store management",
      "Team access & roles",
      "Full AI suite",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
    ],
    popular: false,
  },
];

export default function Billing() {
  const [activePlan, setActivePlan] = useState("Starter");

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Billing & Plans
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your subscription and billing preferences
        </p>
      </div>

      {/* Current Plan Badge */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Current Plan
          </p>
          <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">
            {activePlan}
          </p>
        </div>
        <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full">
          Active
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrent = activePlan === plan.name;

          return (
            <div
              key={plan.name}
              className={`
                relative bg-white dark:bg-slate-900/60 backdrop-blur-xl
                border rounded-2xl p-6 shadow-sm
                transition-all duration-300 hover:shadow-lg
                ${
                  plan.popular
                    ? "border-blue-300 dark:border-blue-500/30 hover:shadow-blue-500/10"
                    : "border-slate-200/60 dark:border-white/5"
                }
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-blue-500/20">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
              >
                <Icon size={20} className="text-white" />
              </div>

              {/* Name & Price */}
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mt-1 mb-1">
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-slate-400 dark:text-slate-500">
                  {plan.period}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                {plan.desc}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      size={16}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => setActivePlan(plan.name)}
                disabled={isCurrent}
                className={`
                  w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                  ${
                    isCurrent
                      ? "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 cursor-default"
                      : plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:scale-[1.02] active:scale-[0.98]"
                  }
                `}
              >
                {isCurrent ? "Current Plan" : "Upgrade"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Billing Info Note */}
      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 rounded-2xl p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          💳 No payment method required for the Starter plan. You can upgrade
          anytime. All plans include a 14-day free trial.
        </p>
      </div>
    </div>
  );
}