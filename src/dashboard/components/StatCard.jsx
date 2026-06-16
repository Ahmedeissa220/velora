import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Eye,
  ShoppingCart,
  Users,
} from "lucide-react";

const IconMap = {
  DollarSign,
  Users,
  ShoppingCart,
  Eye,
};

function StatCard({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
      {stats?.map((item, index) => {
        const IconComponent = IconMap[item.icon];
        return (
          <div
            key={index}
            className="
              bg-white/80 dark:bg-slate-900/80
              backdrop-blur-xl
              rounded-2xl
              p-4 sm:p-5 lg:p-6
              border border-slate-200/50 dark:border-slate-700/50
              hover:shadow-xl
              hover:shadow-slate-200/20
              dark:hover:shadow-slate-900/20
              transition-all duration-300
              group
              min-w-0
              overflow-hidden
            "
          >
            <div className="flex items-start justify-between gap-3">
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="
                    text-xs sm:text-sm
                    font-medium
                    text-slate-600 dark:text-slate-400
                    mb-1 sm:mb-2
                    truncate
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    text-2xl sm:text-3xl xl:text-4xl
                    font-bold
                    text-slate-800 dark:text-white
                    mb-2 sm:mb-4
                    truncate
                  "
                >
                  {item.value}
                </p>

                <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                  {item.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 shrink-0" />
                  )}

                  <span
                    className={`
                      text-xs sm:text-sm
                      font-semibold
                      whitespace-nowrap
                      ${
                        item.trend === "up"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }
                    `}
                  >
                    {item.change}
                  </span>

                  <span
                    className="
                      text-xs sm:text-sm
                      text-slate-500 dark:text-slate-400
                      hidden md:block
                    "
                  >
                    Vs Last Month
                  </span>
                </div>
              </div>

              {/* Icon */}
              <div
                className={`
                  p-2 sm:p-3
                  rounded-xl
                  shrink-0
                  ${item.bgColor}
                  group-hover:scale-110
                  transition-all duration-300
                `}
              >
                {IconComponent && <IconComponent
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${item.textColor}`}
                />}
              </div>
            </div>

            {/* Progressbar */}
            <div className="mt-4 sm:mt-5 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`
                  h-full
                  bg-gradient-to-r
                  ${item.color}
                  rounded-full
                  transition-all duration-500
                `}
                style={{
                  width: item.trend === "up" ? "75%" : "45%",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatCard;
