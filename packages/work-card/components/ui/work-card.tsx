// ── Part 1: 导入声明 ────────────────────────────────────────
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// 品牌表底 SVG（73×12，图标 + 文字合一）
const BrandSvg = () => {
  const uid = React.useId();
  return (
    <svg width="73" height="12" viewBox="0 0 73 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath={`url(#wc-brand-${uid})`}>
        <path d="M2.61816 0.990477C2.81315 0.496794 3.35844 0.235169 3.875 0.368407L3.98535 0.402586L10.6553 2.89184C11.1669 3.08284 11.442 3.61506 11.3076 4.11743L11.2705 4.22778L9.27441 9.28247V11.1047C9.27437 11.4146 9.01523 11.666 8.69531 11.6663H0.580078C0.259967 11.6663 3.98427e-05 11.4147 0 11.1047V4.4104C0 4.10037 0.259943 3.84888 0.580078 3.84888H1.48828L2.61816 0.990477ZM0.96582 10.7297H8.30762V9.12524L8.30176 9.12329L8.30762 9.10766V4.78442H0.96582V10.7297ZM4.92578 8.31567C5.08585 8.31567 5.21582 8.44564 5.21582 8.60571V8.96216C5.21562 9.12206 5.08573 9.25122 4.92578 9.25122H3.1875C3.02755 9.25122 2.89766 9.12206 2.89746 8.96216V8.60571C2.89746 8.44564 3.02743 8.31567 3.1875 8.31567H4.92578ZM6.08594 6.36059C6.2458 6.36084 6.375 6.49071 6.375 6.65063V7.0061C6.375 7.16602 6.2458 7.2959 6.08594 7.29614H3.1875C3.02743 7.29614 2.89746 7.16617 2.89746 7.0061V6.65063C2.89746 6.49056 3.02743 6.36059 3.1875 6.36059H6.08594ZM3.64355 1.27661C3.60641 1.26275 3.566 1.27314 3.54004 1.29907L3.51953 1.33032L2.52539 3.84888H8.69531C9.01525 3.8491 9.27441 4.10051 9.27441 4.4104V6.65942L10.3691 3.88696L10.376 3.85083C10.375 3.82653 10.3638 3.80326 10.3457 3.78638L10.3135 3.76587L3.64355 1.27661Z" fill="#508AFF"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M40.4393 1.58154L40.4152 2.49977H49.4112L49.4702 1.58154H40.4393Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M44.3618 2.49866L43.692 10.0653H44.8286L45.5013 2.49866H44.3618Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M39.2141 10.0647L39.1206 11.0038H49.316L49.4095 10.0647H39.2141Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M51.9947 4.01344L51.3215 11.5579H52.3802L53.1434 2.25049L51.9947 4.01344Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M52.989 0.932617C52.989 0.932617 52.1353 3.31622 50.489 4.29665C50.4932 4.29329 50.4296 5.29344 50.4296 5.29344C50.4296 5.29344 52.6855 4.72221 54.1309 0.932617C54.1296 0.936223 52.989 0.932617 52.989 0.932617Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M55.6802 0.932617C55.6802 0.932617 54.8986 3.26686 53.295 4.12793C53.2989 4.12473 53.2385 5.07473 53.2385 5.07473C53.2385 5.07473 55.463 4.31801 56.7542 0.932617C56.7529 0.936042 55.6802 0.932617 55.6802 0.932617Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M55.6804 2.87267H61.1249L61.1881 2.08167H56.1137L55.6804 2.87267Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M56.5404 2.8728L55.8019 11.5584H56.7767L57.5051 2.8728H56.5404Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M57.2147 5.05408H60.3284L60.244 5.90873H57.1082L57.2147 5.05408Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M66.8923 2.50854H70.3341L70.2496 3.3632H66.7858L66.8923 2.50854Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M61.7352 5.06738H72.0349L71.9505 5.92204H61.6287L61.7352 5.06738Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M56.8735 8.03528H60.47L60.3856 8.88993H56.767L56.8735 8.03528Z" fill="#878D99"/>
        <path d="M66.1772 11.5572H65.0815L65.5288 6.29344H66.6244L66.1772 11.5572ZM66.6556 5.92136H65.56L65.9858 0.911499H67.0814L66.6556 5.92136Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M66.9179 7.10229L66.8394 7.98157C66.8394 7.98157 68.6125 8.54221 70.0496 9.57514L70.1174 8.30407C70.1174 8.30407 68.7351 7.46688 66.9179 7.10229Z" fill="#878D99"/>
        <path d="M18.6109 2.45544H20.399L20.5367 0.911499H21.4996L21.3687 2.45544H22.2916L22.2144 3.38904H21.2984C21.2971 3.42614 21.1233 8.19733 19.5523 9.59705C19.5557 9.60863 20.3043 10.2665 21.3355 10.5228C21.3298 10.5383 21.2711 11.5402 21.2701 11.557C21.2701 11.557 19.6594 10.9662 18.8677 10.2474C18.8658 10.2457 17.8956 11.0248 16.2398 11.5365C16.2329 11.5386 16.3103 10.5334 16.3111 10.5228C16.3111 10.5228 17.4254 10.2123 18.274 9.59705C18.2632 9.5887 16.8702 8.59753 17.5709 3.38904C17.5716 3.38391 16.5367 3.38904 16.5367 3.38904L16.6441 2.45544H17.6549L17.7769 0.911499H18.733L18.6109 2.45544ZM18.5299 3.38513C18.528 3.40474 18.4234 4.49538 18.3111 6.23376C18.1983 7.97967 18.9582 8.92482 18.9781 8.91833C19.7072 8.00063 19.9361 6.89353 20.024 6.4906C20.1114 6.08883 20.3261 3.41678 20.3287 3.38513H18.5299Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M27.1226 1.63428L26.4177 10.1104C26.3677 10.711 25.8657 11.1731 25.263 11.1731H22.056L22.8357 1.63428H27.1226ZM26.0509 2.61731H23.7454L23.1248 10.2689H24.9342C25.2083 10.2689 25.4365 10.0587 25.4591 9.7856L26.0509 2.61731Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M28.7849 1.11769C28.7849 1.11769 29.4951 2.61232 29.4951 3.58331C29.4951 3.5888 30.5535 3.58331 30.5535 3.58331C30.5535 3.58331 30.2945 1.93447 29.8546 1.11769H28.7849Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M28.7047 3.88517C28.7047 3.88517 29.4148 5.39607 29.4148 6.34241H30.4641C30.4641 6.34241 30.2193 4.57981 29.7727 3.88517C29.7702 3.88124 28.7047 3.88517 28.7047 3.88517Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M29.4627 6.74887C29.4627 6.74887 29.0063 9.32727 27.8965 11.4258C27.8982 11.4226 29.0432 11.4258 29.0432 11.4258C29.0432 11.4258 30.2691 8.60173 30.4643 6.74887H29.4627Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M34.5726 0.912964L34.4843 1.89476H31.2567L31.1841 2.7853H38.6032L38.6957 1.89476H35.5514L35.627 0.912964H34.5726Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M33.5003 2.7844C33.5003 2.7844 32.8129 3.94842 31.2327 5.11245C31.2358 5.11018 31.1841 5.93491 31.1841 5.93491H38.322L37.2998 3.49948H36.1435L36.7868 5.05887H32.7994C32.7994 5.05887 34.1026 3.87937 34.655 2.7844C34.6559 2.78253 33.5003 2.7844 33.5003 2.7844Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M31.9123 6.4281H32.8782L32.6352 9.17198C32.6352 9.17198 32.4674 11.205 30.3688 11.5372L30.4366 10.5954C30.4366 10.5954 31.5734 10.389 31.6843 9.17198C31.7456 8.50022 31.9123 6.4281 31.9123 6.4281Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M33.965 6.40222H34.9309L34.5374 11.3314H33.5608L33.965 6.40222Z" fill="#878D99"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M36.0491 6.4021H36.9951L36.7138 9.92136C36.7138 9.92136 36.6944 10.3516 37.3418 10.3516C37.9891 10.3516 38.2415 10.3516 38.2415 10.3516L38.1781 11.2558H36.8666C36.8666 11.2558 35.7156 11.1368 35.7648 10.0388C35.8141 8.94087 36.0491 6.4021 36.0491 6.4021Z" fill="#878D99"/>
      </g>
      <defs>
        <clipPath id={`wc-brand-${uid}`}>
          <rect width="72.0349" height="12" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

// ── Part 2: cn() 工具函数 ────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Part 2.5: 卡头规范图标 ──────────────────────────────────
//
// 工作卡卡头必须使用以下 5 个规范图标，不可随意替换。
// 图标 SVG 尺寸 20×20，填充色 currentColor（继承卡头状态文字色）。
//

interface WorkCardIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/** 卡头图标 —— 待办（日历 + 勾选） */
export const IconTodo = React.forwardRef<SVGSVGElement, WorkCardIconProps>(
  ({ size = 20, className, style, ...props }, ref) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      ref={ref}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M2.5 4.79167C2.5 3.52601 3.52601 2.5 4.79167 2.5H15.2083C16.474 2.5 17.5 3.52601 17.5 4.79167V5.9375H2.50011V7.1875H17.5V15.2083C17.5 16.474 16.474 17.5 15.2083 17.5H4.79167C3.52601 17.5 2.5 16.474 2.5 15.2083V4.79167ZM8.15027 11.2247C7.90619 10.9806 7.51046 10.9806 7.26638 11.2247C7.02231 11.4688 7.02231 11.8645 7.26638 12.1086L8.88828 13.7305C9.13236 13.9746 9.52809 13.9746 9.77217 13.7305L13.5025 10.0001C13.7466 9.75606 13.7466 9.36033 13.5025 9.11626C13.2585 8.87218 12.8627 8.87218 12.6187 9.11626L9.33022 12.4047L8.15027 11.2247Z" fill="currentColor"/>
    </svg>
  )
);
IconTodo.displayName = "IconTodo";

/** 卡头图标 —— 任务类（清单列表） */
export const IconTask = React.forwardRef<SVGSVGElement, WorkCardIconProps>(
  ({ size = 20, className, style, ...props }, ref) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      ref={ref}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M2.91669 3.75008C2.91669 3.28984 3.28978 2.91675 3.75002 2.91675H16.25C16.7103 2.91675 17.0834 3.28984 17.0834 3.75008V16.2501C17.0834 16.7103 16.7103 17.0834 16.25 17.0834H3.75002C3.28978 17.0834 2.91669 16.7103 2.91669 16.2501V3.75008ZM8.33333 8.125C8.33333 7.77982 8.61315 7.5 8.95833 7.5H14.375C14.7202 7.5 15 7.77982 15 8.125C15 8.47018 14.7202 8.75 14.375 8.75H8.95833C8.61315 8.75 8.33333 8.47018 8.33333 8.125ZM5.625 7.5C5.27982 7.5 5 7.77982 5 8.125C5 8.47018 5.27982 8.75 5.625 8.75H6.45833C6.80351 8.75 7.08333 8.47018 7.08333 8.125C7.08333 7.77982 6.80351 7.5 6.45833 7.5H5.625ZM5 11.875C5 11.5298 5.27982 11.25 5.625 11.25H6.45833C6.80351 11.25 7.08333 11.5298 7.08333 11.875C7.08333 12.2202 6.80351 12.5 6.45833 12.5H5.625C5.27982 12.5 5 12.2202 5 11.875ZM8.95833 11.25C8.61315 11.25 8.33333 11.5298 8.33333 11.875C8.33333 12.2202 8.61315 12.5 8.95833 12.5H14.375C14.7202 12.5 15 12.2202 15 11.875C15 11.5298 14.7202 11.25 14.375 11.25H8.95833Z" fill="currentColor"/>
    </svg>
  )
);
IconTask.displayName = "IconTask";

/** 卡头图标 —— 日程通知（日历） */
export const IconSchedule = React.forwardRef<SVGSVGElement, WorkCardIconProps>(
  ({ size = 20, className, style, ...props }, ref) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      ref={ref}
      {...props}
    >
      <rect x="5.41663" y="2.5" width="1.25" height="3.75" rx="0.625" fill="currentColor"/>
      <rect x="13.3334" y="2.5" width="1.25" height="3.75" rx="0.625" fill="currentColor"/>
      <path d="M2.5 5.83342C2.5 4.91294 3.24619 4.16675 4.16667 4.16675H15.8333C16.7538 4.16675 17.5 4.91294 17.5 5.83341V8.33341H2.5V5.83342Z" fill="currentColor"/>
      <path d="M2.5 9.58325H17.5V15.8333C17.5 16.7537 16.7538 17.4999 15.8333 17.4999H4.16667C3.24619 17.4999 2.5 16.7537 2.5 15.8333V9.58325Z" fill="currentColor"/>
    </svg>
  )
);
IconSchedule.displayName = "IconSchedule";

/** 卡头图标 —— 热点热门（火焰） */
export const IconHot = React.forwardRef<SVGSVGElement, WorkCardIconProps>(
  ({ size = 20, className, style, ...props }, ref) => {
    const uid = React.useId();
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        ref={ref}
        {...props}
      >
        <g clipPath={`url(#wc-hot-${uid})`}>
          <path fillRule="evenodd" clipRule="evenodd" d="M16.6694 9.02315C16.2715 8.14421 15.7023 7.3656 14.978 6.71141L14.3843 6.17561C14.2966 6.09936 14.1579 6.13347 14.1191 6.24184L13.8539 6.99034C13.6886 7.45991 13.3846 7.93952 12.9541 8.4111C12.9256 8.4412 12.8929 8.44923 12.8705 8.45123C12.8481 8.45324 12.8134 8.44923 12.7828 8.42113C12.7542 8.39705 12.7399 8.36093 12.742 8.32481C12.8174 7.11677 12.5222 5.69241 11.6464 4.27124C11.0293 3.26988 10.0978 2.5654 8.98988 1.75968L8.14727 1.27205C8.0371 1.20784 7.89633 1.29212 7.90245 1.41854L7.94733 2.38177C7.97794 3.03997 7.81279 3.26988 7.62917 3.7535C7.40474 4.34548 7.08239 4.89533 6.67027 5.38898C6.38055 5.73414 6.05616 6.04518 5.70116 6.31408C4.84223 6.96225 4.13427 7.80708 3.65482 8.75224C3.17129 9.70744 2.91626 10.777 2.91626 11.8486C2.91626 12.7958 3.106 13.7129 3.4814 14.5778C3.84456 15.4105 4.36278 16.1611 5.02177 16.8032C5.6828 17.4454 6.44992 17.951 7.30477 18.3022C7.54384 18.4008 7.51936 18.4072 7.69915 18.4562C7.73791 18.4668 7.85971 18.5031 7.92557 18.4221C8.07991 18.2325 7.85971 15.3174 7.85971 15.3174C7.85971 15.3174 9.3679 18.3042 10.5054 18.7169C10.6642 18.7745 10.8067 18.7394 10.8314 18.7396C10.9158 18.74 10.9513 18.7394 11.0293 18.7378C11.8529 18.7218 12.102 18.6278 12.8909 18.3042C13.7457 17.9531 14.5149 17.4494 15.1739 16.8052C15.8349 16.1631 16.3532 15.4125 16.7143 14.5798C17.0897 13.7149 17.2794 12.7978 17.2794 11.8506C17.2794 10.8713 17.0754 9.92015 16.6694 9.02315Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id={`wc-hot-${uid}`}>
            <rect width="17.5" height="17.5" fill="white" transform="translate(1.25 1.25)"/>
          </clipPath>
        </defs>
      </svg>
    );
  }
);
IconHot.displayName = "IconHot";

/** 卡头图标 —— 通知类（喇叭） */
export const IconNotice = React.forwardRef<SVGSVGElement, WorkCardIconProps>(
  ({ size = 20, className, style, ...props }, ref) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      ref={ref}
      {...props}
    >
      <rect x="14.2352" y="9.4502" width="4.36173" height="1.30852" rx="0.654259" fill="currentColor"/>
      <rect x="14.2003" y="5.3501" width="4.36173" height="1.30852" rx="0.654259" transform="rotate(-30 14.2003 5.3501)" fill="currentColor"/>
      <rect width="4.36173" height="1.30852" rx="0.654259" transform="matrix(-0.866025 -0.5 -0.5 0.866025 18.6318 15.9053)" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.81627 5.95679C2.01647 5.95679 1.3681 6.60516 1.3681 7.40495V12.5953C1.3681 13.3951 2.01647 14.0434 2.81627 14.0434H5.07558V5.95679H2.81627ZM5.94793 5.94133V14.0589C5.97896 14.0683 6.00875 14.0818 6.03643 14.0993L10.4982 16.9141C11.2214 17.3704 12.1638 16.8507 12.1638 15.9955V4.00462C12.1638 3.14948 11.2214 2.62974 10.4982 3.08604L6.03643 5.90094C6.00875 5.91841 5.97896 5.93196 5.94793 5.94133Z" fill="currentColor"/>
    </svg>
  )
);
IconNotice.displayName = "IconNotice";

// ── Part 3: 样式变体定义（cva）───────────────────────────────
//
// WorkCard 工作卡容器组件（复合组件）
//
// 如流工作卡框架：WorkCard → (WorkCardHeader + WorkCardBody + WorkCardFooter)
// 卡头与底部品牌标签为常驻部分，中间 Body 可放任何组件搭配。
//
// 设计稿参数（Figma ⭐️工作卡框架）：
//   默认宽度      324px（w-[324px]）
//   最小宽度      272px（min-w-[272px]）
//   最大宽度      560px（max-w-[560px]）
//   圆角          8px → var(--corner-md)，卡头承担顶部圆角、卡尾承担底部圆角
//   overflow      visible（卡片容器），避免裁剪 Select 下拉菜单
//   边框          0.5px solid → var(--border-color)
//   背景          #FFFFFF → var(--bg-primary)
//   卡头高度      44px（h-[44px]，padding 12px 四周，box-border）
//   卡头图标容器  20×20，内部图标 20×20
//   卡头图标间距  与文字间距 8px (--space-tight)
//   卡头文字      13px / medium / leading-normal / 品牌蓝 (--brand-base)
//   内容区        padding: 12px 左右上 (--space-content)
//   内容间距      默认 12px (--space-content)，允许 8px (--space-tight)
//   内容区排版    仅允许以下 4 级字号（禁止使用其他字号组合）：
//     标题一      15px / medium / line-height 22px → text-[var(--font-size-lg)] font-[var(--font-weight-medium)] leading-[var(--font-height-lg)]
//     标题二      13px / medium / line-height 20px → text-[var(--font-size-sm)] font-[var(--font-weight-medium)] leading-[var(--font-height-sm)]
//     文本字段    13px / regular / line-height 20px → text-[var(--font-size-sm)] font-[var(--font-weight-regular)] leading-[var(--font-height-sm)]
//     辅助信息    12px / regular / line-height 18px → text-[var(--font-size-xs)] font-[var(--font-weight-regular)] leading-[var(--font-height-xs)]
//   标题一用途    卡片主标题（如审批标题、任务名称），颜色 --text-heading
//   标题二用途    分区标题/强调文字，颜色 --text-heading
//   文本字段用途  正文内容、属性值、表单标签，颜色 --text-body / --text-secondary
//   辅助信息用途  提示文字、时间戳、状态说明，颜色 --text-help / --text-disabled
//
//   排版使用示例（语义类名 + 颜色变量，可直接复制）：
//     <h3 className="wc-title1 text-[var(--text-heading)]">审批标题</h3>
//     <h4 className="wc-title2 text-[var(--text-heading)]">分区标题</h4>
//     <p className="wc-text text-[var(--text-body)]">正文内容</p>
//     <span className="wc-caption text-[var(--text-help)]">提示文字</span>
//
//   HTML demo 排版类 CSS 定义（知识库为空时兜底使用）：
//     .wc-title1 { font-size: var(--font-size-lg); font-weight: var(--font-weight-medium); line-height: var(--font-height-lg); }
//     .wc-title2 { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); line-height: var(--font-height-sm); }
//     .wc-text   { font-size: var(--font-size-sm); font-weight: var(--font-weight-regular); line-height: var(--font-height-sm); }
//     .wc-caption { font-size: var(--font-size-xs); font-weight: var(--font-weight-regular); line-height: var(--font-height-xs); }
//
//   底部品牌      分割线 + padding 10px 上下，图标 12×12 + 4px gap + 品牌文字图片 58×12
//   内部圆角      单行输入框（input）、选择器（select）、按钮（button）在工作卡内使用全圆角 (--corner-pill)
//   内部水平边距  单行输入框（input）、选择器（select）在工作卡内左右 padding 为 12px (--space-content)
//                 多行输入框（textarea）在工作卡内使用 8px 圆角 (--corner-md)
//   占位文字      输入框 placeholder 和选择器未选中时的提示文字统一使用 --text-disabled
//   内部按钮      必须使用工作卡按钮样式，高度 32px，最小宽度 65px
//                 允许三种变体：
//                   outline-primary   — 蓝色线框，用于核心操作（主要按钮）
//                   outline           — 灰色线框，用于辅助/低优先级操作（次要按钮）
//                   outline-destructive — 红色线框，用于拒绝/删除等负面操作（负向按钮）
//   按钮搭配规则  主要按钮和负向按钮各最多 1 个，次要按钮数量不限
//                 常见组合（左 → 右）：
//                   次要 + 主要     — 辅助操作 + 核心行动（如「查看详情」+「一键催办」）
//                   主要 + 负向     — 二选一决策（如「同意」+「拒绝」）
//                   次要 + 负向     — 辅助操作 + 危险操作（如「查看」+「删除」）
//                   次要 + 次要 + 主要 — 多个辅助 + 单个核心
//                 判断原则：核心行动用主要，危险操作用负向，其余用次要
//   按钮操作区    WorkCardActions 统一管理
//                 layout="fill"（默认）— 按钮等分填充容器宽度，适用于单个按钮或纯按钮组合（审批、确认等）
//                 layout="auto" — 按钮宽度由文案自适应，仅在按钮与输入框/选择器横向组合时使用
//   内部 Tag/Badge 工作卡内使用 Tag 时统一采用 tag.tsx 的 md（默认）尺寸：
//                   高度 18px (--comp-height-xs)
//                   内边距 4px (--space-intimate)
//                   字号 11px
//                   圆角 2px (--radius-xs)
//                   无边框，仅背景色 + 文字色（使用原始色板 -0 浅色底 + -5 文字色）
//                   Tag 与同行文本对齐时保持文本流，不得将整行容器改为 flex 破坏换行排版
// ────────────────────────────────────────────────────────────

const workCardVariants = cva(
  [
    "flex flex-col",
    "font-['PingFang_SC',sans-serif]",
    // overflow 必须为 visible，避免裁剪 Select 下拉菜单；
    // 卡头与卡尾各自通过 rounded-t / rounded-b 承担圆角裁剪
    "overflow-visible",
    "w-[324px] min-w-[272px] max-w-[560px]",
    "rounded-[var(--corner-md)]",
    "bg-[var(--bg-primary)]",
    "border-[0.5px] border-solid border-[var(--border-color)]",
    // 工作卡内单行输入框、选择器强制使用全圆角（pill）
    "[&_input]:rounded-[var(--corner-pill)]",
    "[&_select]:rounded-[var(--corner-pill)]",
    // 工作卡内单行输入框、选择器左右内边距 12px（覆盖默认 8px）
    "[&_input]:px-[var(--space-content)]",
    "[&_select]:px-[var(--space-content)]",
    // 工作卡内多行输入框使用 8px 圆角（corner-md）
    "[&_textarea]:rounded-[var(--corner-md)]",
    "[&_button]:rounded-[var(--corner-pill)]",
    // 工作卡内按钮必须使用工作卡按钮样式（outline-primary / outline / outline-destructive），高度固定 32px，最小宽度 65px
    "[&_button]:h-8",
    "[&_button]:min-w-[65px]",
    // 工作卡内容区排版约束 — 仅允许 4 级字号
    // 标题一：15px / medium（卡片主标题）
    "[&_.wc-title1]:text-[var(--font-size-lg)]",
    "[&_.wc-title1]:font-[var(--font-weight-medium)]",
    "[&_.wc-title1]:leading-[var(--font-height-lg)]",
    // 标题二：13px / medium（分区标题/强调文字）
    "[&_.wc-title2]:text-[var(--font-size-sm)]",
    "[&_.wc-title2]:font-[var(--font-weight-medium)]",
    "[&_.wc-title2]:leading-[var(--font-height-sm)]",
    // 文本字段：13px / regular（正文内容、属性值、表单标签）
    "[&_.wc-text]:text-[var(--font-size-sm)]",
    "[&_.wc-text]:font-[var(--font-weight-regular)]",
    "[&_.wc-text]:leading-[var(--font-height-sm)]",
    // 辅助信息：12px / regular（提示文字、时间戳、状态说明）
    "[&_.wc-caption]:text-[var(--font-size-xs)]",
    "[&_.wc-caption]:font-[var(--font-weight-regular)]",
    "[&_.wc-caption]:leading-[var(--font-height-xs)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:border-[var(--border-color)]",
          "active:border-[var(--border-color)]",
        ],
        elevated: [
          "border-transparent",
          "shadow-[var(--shadow-sm)]",
          "hover:shadow-[var(--shadow-md)]",
          "active:shadow-[var(--shadow-sm)]",
        ],
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const workCardHeaderVariants = cva(
  [
    "flex items-center",
    "h-[44px]",
    "px-[var(--space-content)] py-[var(--space-content)]",
    "gap-[var(--space-tight)]",
    "shrink-0",
    "overflow-hidden",
    "box-border",
    "rounded-t-[var(--corner-md)]",
  ],
  {
    variants: {
      /**
       * color — 卡头状态文字颜色 & 背景渐变色
       * 默认一律使用蓝色，除非有特殊要求。
       * 场景化适配：blue—链接/基础/进行中，green—成功/完成，
       * red—警示/错误/删除，orange—强调/提示，gray—失败/取消/失效。
       * 背景为双层：上层 linear-gradient（品牌色半透明），下层 var(--bg-primary, #FFF)
       */
      color: {
        blue: "text-[var(--brand-base)]",
        red: "text-[var(--status-error)]",
        green: "text-[var(--status-success)]",
        orange: "text-[var(--status-warning)]",
        gray: "text-[var(--status-neutral)]",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

// ── Body 内常见组件邻接间距参考 ────────────────────────────────
//
// WorkCardBody 通过 flex gap 统一控制子元素间距（默认 12px）。
// 下表列出常见组件对之间的实际间距（已验收），供开发和 AI 生成时参考。
//
// 邻接组合                           间距     实现方式
// ─────────────────────────────────  ───────  ──────────────────────
// card-title  → attr-list           12px     body gap（默认）
// card-title  → 自定义列表           12px     body gap（默认）
// attr-list   → divider             12px     body gap（默认）
// 自定义列表  → expand-link          4px      列表与 link 用 group 容器包裹（gap: --space-intimate），
//                                             或 expand-link 设 margin-top: calc(--space-intimate - --space-content)
// expand-link → actions             12px     body gap（默认）
// actions     → divider             12px     body gap（默认）
// divider     → tip                 12px     body gap（默认）
// actions     → tip（无分割线时）    12px     body gap（默认）
//
// 非默认间距的推荐实现方式（优先级从高到低）：
//   1. 将需要紧凑间距的元素包在一个 group 容器中，容器内用小 gap
//   2. 在目标元素上设 negative margin 补偿 body gap 差值
//   3. 切换 body 的 spacing 变体（影响所有子元素，慎用）
// ────────────────────────────────────────────────────────────────

const workCardBodyVariants = cva(
  [
    "flex-1 flex flex-col",
    "px-[var(--space-content)] pt-[var(--space-content)]",
  ],
  {
    variants: {
      /**
       * spacing — 卡内组件间距
       * default(12px) 最常用；tight(8px) 适中；intimate(4px) 用于紧凑的纯文字/链接场景
       */
      spacing: {
        intimate: "gap-[var(--space-intimate)]",
        tight: "gap-[var(--space-tight)]",
        default: "gap-[var(--space-content)]",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }
);

/**
 * 卡头背景渐变映射
 * 上层：78deg 方向的品牌色半透明渐变
 * 下层：白色 var(--bg-primary, #FFF)
 */
const headerBgMap: Record<string, string> = {
  blue: "linear-gradient(78deg, rgba(51, 119, 255, 0.16) 38.79%, rgba(51, 119, 255, 0.10) 75.54%), var(--bg-primary, #FFF)",
  red: "linear-gradient(78deg, rgba(255, 80, 64, 0.16) 38.79%, rgba(255, 80, 64, 0.10) 75.54%), var(--bg-primary, #FFF)",
  green: "linear-gradient(78deg, rgba(27, 178, 62, 0.16) 38.79%, rgba(27, 178, 62, 0.10) 75.54%), var(--bg-primary, #FFF)",
  orange: "linear-gradient(78deg, rgba(255, 119, 51, 0.16) 38.79%, rgba(255, 119, 51, 0.10) 75.54%), var(--bg-primary, #FFF)",
  gray: "linear-gradient(78deg, rgba(119, 134, 163, 0.16) 38.79%, rgba(119, 134, 163, 0.10) 75.54%), var(--bg-primary, #FFF)",
};

// ── Part 4: Props 类型定义 ────────────────────────────────────

export interface WorkCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof workCardVariants> {}

export interface WorkCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof workCardHeaderVariants> {
  /** 卡头左侧图标节点（20×20），工作卡规范要求必传，使用本文件导出的 5 个规范图标之一（IconTodo / IconTask / IconSchedule / IconHot / IconNotice） */
  icon?: React.ReactNode;
  /** 卡头状态/属性文字，工作卡规范要求必传 */
  label?: React.ReactNode;
}

export interface WorkCardBodyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof workCardBodyVariants> {}

export interface WorkCardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 品牌表底节点（73×12 SVG），不传使用默认如流品牌 SVG，传 null 隐藏 */
  brandSvg?: React.ReactNode;
}

// ── Part 5: 组件实现 ─────────────────────────────────────────

/**
 * WorkCard — 工作卡根容器
 * 如流工作卡框架，max-width 560px，包含常驻卡头和底部品牌标签。
 */
export const WorkCard = React.forwardRef<HTMLDivElement, WorkCardProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(workCardVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

WorkCard.displayName = "WorkCard";

/**
 * WorkCardHeader — 卡头（常驻）
 * 高度 44px（padding 12px + 20px 内容行高），左侧图标 + 状态文字。
 * 对应设计稿蓝色顶部区域。
 *
 * 图标容器 20×20，图标 SVG 20×20（匹配 Figma 卡头图标规范）。
 */
export const WorkCardHeader = React.forwardRef<
  HTMLDivElement,
  WorkCardHeaderProps
>(({ className, color, icon, label, children, style, ...props }, ref) => {
  const bg = headerBgMap[color ?? "blue"];
  return (
    <div
      ref={ref}
      className={cn(workCardHeaderVariants({ color, className }))}
      style={{ background: bg, ...style }}
      {...props}
    >
      {icon && (
        <span className="inline-flex shrink-0 w-[20px] h-[20px] items-center justify-center">
          {icon}
        </span>
      )}
      {label && (
        <span className="text-[13px] font-medium leading-normal whitespace-nowrap">
          {label}
        </span>
      )}
      {children}
    </div>
  );
});

WorkCardHeader.displayName = "WorkCardHeader";

/**
 * WorkCardBody — 中间内容区域（可放任何组件搭配）
 * padding: 12px 左右上，内部子元素间距 12px。
 * 无底部 padding，由 Footer 的分割线自然分隔。
 */
export const WorkCardBody = React.forwardRef<HTMLDivElement, WorkCardBodyProps>(
  ({ className, spacing, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(workCardBodyVariants({ spacing, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

WorkCardBody.displayName = "WorkCardBody";

/**
 * WorkCardFooter — 底部品牌标签（常驻）
 * 顶部分割线 + 上下 10px padding，包含 73×12 品牌表底 SVG（图标 + 文字合一）。
 * 对应设计稿最下方「如流工作卡」品牌区域。
 *
 * 设计稿参数：
 *   分割线        全宽 1px → var(--divider-color)
 *   品牌容器      h-[12px]，py-[10px]，flex items-center
 *   品牌表底      73×12 (表底.svg)，图标 #508AFF + 文字 #878D99
 */
export const WorkCardFooter = React.forwardRef<
  HTMLDivElement,
  WorkCardFooterProps
>(({ className, brandSvg, children, ...props }, ref) => {
  const resolvedBrand =
    brandSvg === undefined ? (
      <BrandSvg />
    ) : brandSvg ? (
      <span className="inline-flex shrink-0 h-[12px] items-center justify-center">
        {brandSvg}
      </span>
    ) : null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        "px-[var(--space-content)] pt-[var(--space-content)]",
        "rounded-b-[var(--corner-md)]",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      {/* 分割线 */}
      <div className="w-full h-px bg-[var(--divider-color)]" />
      {/* 品牌区域 */}
      <div className="flex items-center py-[10px]">
        <span className="inline-flex items-center h-[12px]">
          {resolvedBrand}
        </span>
        {children}
      </div>
    </div>
  );
});

WorkCardFooter.displayName = "WorkCardFooter";

// ── Part 5.5a: 按钮操作区组件 ──────────────────────────────────
//
// WorkCardActions — 工作卡按钮操作区
//
// 统一管理卡内按钮的排列方式，放在 WorkCardBody 末尾。
//
// 设计稿参数：
//   布局            flex，右对齐（justify-end）
//   按钮间距        8px (--space-tight)
//   layout 模式
//     fill（默认）  按钮等分填充容器宽度（flex-1），适用于：
//                   · 单个按钮（如「提交」「确认」）
//                   · 多个纯按钮组合（如「同意 / 拒绝」「保存 / 取消」）
//     auto          按钮宽度由文案自适应，仅用于：
//                   · 按钮与输入框/选择器横向排列的组合场景（如搜索框 + 搜索按钮）
// ────────────────────────────────────────────────────────────

export interface WorkCardActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 按钮布局模式：fill 等分填充容器宽度（默认），auto 文案自适应宽度（仅用于按钮与输入框/选择器横向组合） */
  layout?: "auto" | "fill";
}

/**
 * WorkCardActions — 工作卡按钮操作区
 * 放在 WorkCardBody 内部底部，统一管理按钮排列方式。
 *
 * - `layout="fill"`（默认）— 按钮等分填充容器宽度，适用于单个按钮或纯按钮组合
 * - `layout="auto"` — 按钮宽度由文案自适应，仅用于按钮与输入框/选择器横向排列的场景
 */
export const WorkCardActions = React.forwardRef<
  HTMLDivElement,
  WorkCardActionsProps
>(({ className, layout = "fill", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex justify-end gap-[var(--space-tight)]",
        layout === "fill" && "[&>button]:flex-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

WorkCardActions.displayName = "WorkCardActions";

// ── 提示信息区（wc-tip）CSS 约定 ─────────────────────────────────
//
// wc-tip 用于 WorkCardBody 底部的辅助提示，通常位于 Actions 下方或 divider 下方。
// 当前仅作为 CSS 类约定（在 work-card-base.css 中定义），未封装为 React 组件。
// 如后续多处复用且需要 props 控制，可提升为正式组件。
//
// 结构（HTML）：
//   <div class="wc-tip">
//     <span class="wc-tip__icon"><!-- 16×16 SVG，fill="currentColor" --></span>
//     <span class="wc-tip__text">提示文字 <span class="wc-tip__link">链接</span></span>
//   </div>
//
// 样式参数：
//   布局          flex，icon 与 text 间距 4px (--space-intimate)
//   图标          16×16，使用 components/icons 中的「大模型-提示」图标
//   字级          wc-caption 级别 — 12px / 18px / --text-help
//   链接色        --brand-base
// ────────────────────────────────────────────────────────────────

// ── Part 5.5b: 键值对属性列表组件 ───────────────────────────────
//
// WorkCardAttrList — 键值对属性列表容器
//   └ WorkCardAttrItem — 单行键值对
//       ├ WorkCardAttrLabel — 字段名（自动追加中文冒号"："）
//       └ WorkCardAttrValue — 字段值（最多 2 行，溢出省略）
//
// 设计稿参数：
//   布局            CSS Grid（grid-template-columns: auto 1fr）
//   列表行间距      2px（gap-y-0.5）
//   列间距          8px (--space-tight)（gap-x）
//   单行对齐        baseline
//   字段名宽度      auto（同一列表内所有 label 自动跟随最宽值对齐）
//   字段名颜色      --text-secondary
//   字段值颜色      --text-body
//   字段名冒号      "："（通过 after 伪元素自动追加）
//   字段值行数      最多 2 行（-webkit-line-clamp: 2）
//   字号            13px / line-height 1.6
//
// 间距规则（由 WorkCardBody 使用方在外部控制）：
//   card-title → attr-list：12px (--space-content)
//   attr-list  → divider  ：12px (--space-content)
// ────────────────────────────────────────────────────────────

export interface WorkCardAttrListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * WorkCardAttrList — 键值对属性列表容器
 * CSS Grid 两列布局（auto 1fr），所有 label 自动跟随最宽值对齐。
 */
export const WorkCardAttrList = React.forwardRef<
  HTMLDivElement,
  WorkCardAttrListProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-[auto_1fr]",
        "gap-x-[var(--space-tight)] gap-y-0.5",
        "items-baseline",
        "text-[13px] leading-[1.6]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

WorkCardAttrList.displayName = "WorkCardAttrList";

export interface WorkCardAttrItemProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * WorkCardAttrItem — 单行键值对（label + value）
 * display:contents 使子元素直接参与父级 Grid 布局。
 */
export const WorkCardAttrItem = React.forwardRef<
  HTMLDivElement,
  WorkCardAttrItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("[display:contents]", className)}
      {...props}
    >
      {children}
    </div>
  );
});

WorkCardAttrItem.displayName = "WorkCardAttrItem";

export interface WorkCardAttrLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * WorkCardAttrLabel — 字段名
 * 颜色 --text-secondary，不换行。宽度由 Grid auto 列自动决定，同列表内所有 label 等宽。
 * 自动在文字后追加中文冒号"："（通过 CSS after 伪元素）。
 */
export const WorkCardAttrLabel = React.forwardRef<
  HTMLSpanElement,
  WorkCardAttrLabelProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "whitespace-nowrap",
        "text-[var(--text-secondary)]",
        "after:content-['：']",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

WorkCardAttrLabel.displayName = "WorkCardAttrLabel";

export interface WorkCardAttrValueProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * WorkCardAttrValue — 字段值
 * 颜色 --text-body，最多显示 2 行，溢出省略。
 */
export const WorkCardAttrValue = React.forwardRef<
  HTMLSpanElement,
  WorkCardAttrValueProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "text-[var(--text-body)]",
        "overflow-hidden",
        "line-clamp-2",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

WorkCardAttrValue.displayName = "WorkCardAttrValue";

// ── Part 5.6: 表单字段组组件 ─────────────────────────────────
//
// WorkCardFormGroup — 表单字段组容器（共享 Grid 上下文）
//   └ WorkCardFormField — 单行表单字段
//       ├ WorkCardFieldLabel — 字段名
//       └ 任意表单控件（input / select / textarea 等）
//
// 设计稿参数：
//   布局            CSS Grid（grid-template-columns: auto 1fr）
//   行间距          8px (--space-tight)（row-gap）
//   列间距          8px (--space-tight)（column-gap）
//   对齐            center
//   字段名宽度      auto（同一组内所有 label 自动跟随最宽值对齐）
//   字段名颜色      --text-body
//   字段名行高      1.6
//   字号            13px
//
// 间距规则（由 WorkCardBody 使用方在外部控制）：
//   section-title → form-group ：8px (--space-tight)
//   form-group    → section-title：12px (--space-content)
//   form-group    → hint-text    ：8px (--space-tight)
//   form-group    → divider      ：12px (--space-content)
// ────────────────────────────────────────────────────────────

export interface WorkCardFormGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * WorkCardFormGroup — 表单字段组容器
 * CSS Grid 两列布局（auto 1fr），同组内所有 field-label 自动跟随最宽值对齐。
 * 与 WorkCardAttrList 原理相同，适用于 label + input/select 的表单场景。
 */
export const WorkCardFormGroup = React.forwardRef<
  HTMLDivElement,
  WorkCardFormGroupProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-[auto_1fr]",
        "gap-x-[var(--space-tight)] gap-y-[var(--space-tight)]",
        "items-center",
        "text-[13px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

WorkCardFormGroup.displayName = "WorkCardFormGroup";

export interface WorkCardFormFieldProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * WorkCardFormField — 单行表单字段（label + input/select）
 * display:contents 使子元素直接参与父级 Grid 布局。
 */
export const WorkCardFormField = React.forwardRef<
  HTMLDivElement,
  WorkCardFormFieldProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("[display:contents]", className)}
      {...props}
    >
      {children}
    </div>
  );
});

WorkCardFormField.displayName = "WorkCardFormField";

export interface WorkCardFieldLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * WorkCardFieldLabel — 表单字段名
 * 颜色 --text-body，不换行。宽度由 Grid auto 列自动决定，同组内所有 label 等宽。
 * 注意：与 WorkCardAttrLabel 不同，此处不自动追加冒号。
 */
export const WorkCardFieldLabel = React.forwardRef<
  HTMLSpanElement,
  WorkCardFieldLabelProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "whitespace-nowrap",
        "text-[var(--text-body)]",
        "leading-[1.6]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

WorkCardFieldLabel.displayName = "WorkCardFieldLabel";

// ── Part 6: 导出 ─────────────────────────────────────────────
export { workCardVariants, workCardHeaderVariants, workCardBodyVariants };
// 卡头规范图标同时从此文件导出：IconTodo / IconTask / IconSchedule / IconHot / IconNotice
// 按钮操作区组件同时导出：WorkCardActions
// 键值对属性列表组件同时导出：WorkCardAttrList / WorkCardAttrItem / WorkCardAttrLabel / WorkCardAttrValue
// 表单字段组组件同时导出：WorkCardFormGroup / WorkCardFormField / WorkCardFieldLabel
