"use client";

import { useMemo } from "react";

const yiOptions = [
  "散步一下，给脑子留点空白",
  "把今天最重要的一件事先做完",
  "整理桌面 10 分钟，顺便把心也理一理",
  "给未来写一句提醒",
  "做一顿自己喜欢的简单早餐",
  "读一页书就好，别给自己压力",
  "把想法记下来，不必立刻完成",
  "给朋友发一条问候（很短也行）",
  "看一段轻松的视频，恢复能量",
  "今天宜早睡一点点",
  "少刷会儿屏，多走两步",
  "练习一个小技能：10 分钟",
  "收起手机，把注意力还给当下",
  "做一次深呼吸，慢慢来",
  "把未完成的任务拆成下一步",
  "去晒晒太阳，哪怕只有 5 分钟",
  "写一段日记：你今天学到了什么",
  "认真喝一杯水，开始新的节奏",
  "把音乐开到刚刚好",
  "找一个你愿意感谢的人",
  "给自己一个小奖励",
  "把“以后再说”改成“今天就做”",
  "整理照片/备忘录，找回灵感",
  "把一件小事完成到收尾",
  "给咖啡/茶加一点温柔的仪式感",
  "用一句话总结今天：一句就够",
  "把尴尬的念头换成更友善的解释",
  "认真回复一条消息",
  "整理邮件/待办到零头绪",
  "今天宜做个勇敢但不冒险的小决定",
  "把拖延的根源先说出来",
  "做一道简单的菜",
  "把时间留给创作而不是消耗",
  "学会一个快捷方式：少一点摩擦",
  "给自己 15 分钟专注时间",
  "走到窗边看远处，放松眼睛",
  "给电脑前的自己一个拥抱",
  "把心情写进一句短诗",
  "今天宜：把“我不会”改成“我在练”",
  "把今天的预算只花在值得的事上",
  "清空一个文件夹，从小处起步",
  "做一个不会后悔的选择",
  "把你喜欢的事再做一次",
  "把今天的草稿变成明天的草稿",
  "做拉伸：肩颈和后背轻一点",
  "整理一下你的学习路线",
  "今天宜：对自己温柔一点",
  "给项目/文章加一个小完善",
  "写一段“我为什么开始”的文字",
  "去操场/楼下走一圈",
  "把烦恼折成纸船放一放",
  "做饭时听喜欢的歌",
  "收拾衣柜，捐出不用的",
  "把今天的目标写在便签上",
  "做一次不评判的散步",
  "把待办按“快/慢”分组",
  "今天宜：允许自己慢一点",
  "把一段对话当作练习：多表达清楚",
  "给自己留一个小惊喜",
];

function dayOfYearUTC(date: Date) {
  const start = Date.UTC(date.getFullYear(), 0, 1);
  const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((current - start) / 86400000) + 1; // 1-based
}

function yiForDate(date: Date) {
  const index = dayOfYearUTC(date) - 1;
  return yiOptions[index % yiOptions.length] ?? yiOptions[0];
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function Friends365Calendar() {
  const today = useMemo(() => new Date(), []);
  const year = today.getFullYear();

  const todayYi = useMemo(() => yiForDate(today), [today]);
  const todayDayIndex = useMemo(() => dayOfYearUTC(today), [today]);

  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-ink-200/80 bg-gradient-to-b from-accent/8 via-accent/5 to-white px-4 py-4 shadow-sm sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
              {/* Small wombat icon */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-accent"
                fill="none"
              >
                <path
                  d="M9.2 6.6c.8-1.6 4.8-1.6 5.6 0 .4.8.4 1.7 0 2.5-.7 1.2-1.8 1.8-2.8 1.8s-2.1-.6-2.8-1.8c-.4-.8-.4-1.7 0-2.5Z"
                  fill="currentColor"
                  opacity="0.18"
                />
                <path
                  d="M7.6 12.2c.2-2.7 2.4-4.6 4.4-4.6s4.2 1.9 4.4 4.6c.2 2.8-1 6.2-4.4 6.2s-4.6-3.4-4.4-6.2Z"
                  fill="currentColor"
                />
                <path
                  d="M8.4 9.1c-.9-.4-1.7-1.6-1.4-2.6.2-.7.9-.9 1.5-.5.9.6 1.3 1.8 1.1 2.6-.1.6-.6 1-1.2 1Z"
                  fill="currentColor"
                />
                <path
                  d="M15.6 9.1c.9-.4 1.7-1.6 1.4-2.6-.2-.7-.9-.9-1.5-.5-.9.6-1.3 1.8-1.1 2.6.1.6.6 1 1.2 1Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div>
              <h2 className="font-display text-lg text-ink-950 sm:text-xl">
                今日宜
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                第 {todayDayIndex} 天 · {year}-{pad2(today.getMonth() + 1)}-
                {pad2(today.getDate())}
              </p>
            </div>
          </div>

          <p className="max-w-prose rounded-xl border border-ink-200/60 bg-white/70 px-4 py-3 font-display text-lg text-ink-950 leading-relaxed sm:text-xl">
            {todayYi}
          </p>
        </div>
      </div>
    </section>
  );
}

