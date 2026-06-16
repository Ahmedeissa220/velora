import {
  Bell,
  Clock,
  CreditCard,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";

const IconMap = {
  User,
  ShoppingCart,
  CreditCard,
  Settings,
  Bell
};

function ActivityFeed({ activities = [] }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
      {/* Header */}
      <div className="p-5 border-b border-slate-200/60 dark:border-slate-800/50 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Activity Feed</h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">Recent system activities</p>
        </div>

        <button className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium">
          View All
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {activities?.map((activity) => {
          const IconComponent = IconMap[activity.icon];
          return (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition"
          >
            {/* Icon */}
            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
              {IconComponent && <IconComponent className={`w-4 h-4 ${activity.color}`} />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-800 dark:text-white">
                {activity.title}
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {activity.description}
              </p>

              <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}

export default ActivityFeed;
