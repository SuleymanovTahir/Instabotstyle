import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { VariantProps, cva } from "class-variance-authority@0.7.1";
import { PanelLeftIcon } from "lucide-react@0.487.0";

import { useIsMobile } from "./use-mobile";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "./sheet";
import { Skeleton } from "./skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp !== undefined ? openProp : _open;
  const setOpen = setOpenProp !== undefined ? setOpenProp : _setOpen;

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  return React.createElement("div", {
    "data-sidebar": "sidebar",
    className: cn("flex min-h-screen bg-sidebar/80", className),
    style: {
      "--sidebar-width": SIDEBAR_WIDTH,
      "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
      ...style
    },
    ...props
  },
    React.createElement(SidebarContext.Provider, {
      value: {
        state: open ? "expanded" : "collapsed",
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar: () => setOpen((prev) => !prev)
      }
    }, children)
  );
}

function Sidebar({ className, children, ...props }) {
  const isMobile = useIsMobile();
  const { open, setOpen, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return React.createElement(Sheet, {
      open: openMobile,
      onOpenChange: setOpenMobile,
      ...props
    },
      React.createElement(SheetContent, {
        side: "left",
        className: cn("w-[--sidebar-width] p-0", className)
      }, children)
    );
  }

  return React.createElement("div", {
    className: cn(
      "duration-300 ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
      "fixed inset-y-0 left-0 z-10 hidden h-svh shrink-0 translate-x-0 md:flex md:flex-col",
      "data-[state=closed]:-translate-x-full",
      "w-[--sidebar-width] data-[collapsed=true]:w-[--sidebar-width-icon]",
      className
    ),
    ...props
  }, children);
}

function SidebarHeader({ className, ...props }) {
  return React.createElement("div", {
    "data-sidebar": "header",
    className: cn(
      "flex flex-col gap-2 p-2",
      className
    ),
    ...props
  });
}

function SidebarFooter({ className, ...props }) {
  return React.createElement("div", {
    "data-sidebar": "footer",
    className: cn(
      "flex flex-col gap-2 p-2",
      className
    ),
    ...props
  });
}

function SidebarSeparator({ className, ...props }) {
  return React.createElement(Separator, {
    "data-sidebar": "separator",
    className: cn("mx-2 w-auto", className),
    ...props
  });
}

function SidebarContent({ className, ...props }) {
  return React.createElement("div", {
    "data-sidebar": "content",
    className: cn(
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
      className
    ),
    ...props
  });
}

function SidebarGroup({ className, ...props }) {
  return React.createElement("div", {
    "data-sidebar": "group",
    className: cn("relative flex flex-col gap-2 py-2", className),
    ...props
  });
}

function SidebarGroupLabel({ className, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "div";

  return React.createElement(Comp, {
    "data-sidebar": "group-label",
    className: cn(
      "text-sidebar-foreground group-data-[collapsible=icon]:hidden px-2 py-1.5 text-xs font-medium",
      className
    ),
    ...props
  });
}

function SidebarGroupAction({ className, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return React.createElement(Comp, {
    "data-sidebar": "group-action",
    className: cn(
      "ring-sidebar-ring text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute right-1 top-1.5 flex size-5 items-center justify-center rounded-md p-0 outline-hidden transition-all focus-visible:ring-2",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  });
}

function SidebarGroupContent({ className, ...props }) {
  return React.createElement("div", {
    "data-sidebar": "group-content",
    className: cn("w-full", className),
    ...props
  });
}

function SidebarMenu({ className, ...props }) {
  return React.createElement("ul", {
    "data-sidebar": "menu",
    className: cn("flex flex-col gap-1", className),
    ...props
  });
}

function SidebarMenuItem({ className, ...props }) {
  return React.createElement("li", {
    "data-sidebar": "menu-item",
    className: cn("group/menu-item relative", className),
    ...props
  });
}

function SidebarMenuButton({ className, asChild = false, size = "md", isActive = false, tooltip, ...props }) {
  const Comp = asChild ? Slot : "a";
  const { isMobile, state } = useSidebar();

  const button = React.createElement(Comp, {
    "data-sidebar": "menu-button",
    "data-size": size,
    "data-active": isActive,
    className: cn(
      "ring-sidebar-ring text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-sidebar-ring/50 active:bg-sidebar-accent active:text-sidebar-accent-foreground flex min-w-0 items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden transition-all focus-visible:ring-[3px]",
      "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
      "group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2",
      size === "lg" && "py-2 text-base",
      size === "md" && "py-1.5 text-sm",
      size === "sm" && "py-1 text-xs",
      state === "collapsed" && !isMobile && "justify-center",
      className
    ),
    ...props
  });

  if (!tooltip) {
    return button;
  }

  if (isMobile) {
    return React.createElement(TooltipProvider, { delayDuration: 0 },
      React.createElement(Tooltip, null,
        React.createElement(TooltipTrigger, { asChild: true }, button),
        React.createElement(TooltipContent, {
          side: "right",
          align: "center",
          alignOffset: 0
        }, tooltip)
      )
    );
  }

  return state === "collapsed" ? React.createElement(TooltipProvider, { delayDuration: 0 },
    React.createElement(Tooltip, null,
      React.createElement(TooltipTrigger, { asChild: true }, button),
      React.createElement(TooltipContent, {
        side: "right",
        align: "center",
        alignOffset: 0
      }, tooltip)
    )
  ) : button;
}

function SidebarMenuBadge({ className, ...props }) {
  return React.createElement("div", {
    "data-sidebar": "menu-badge",
    className: cn(
      "pointer-events-none absolute right-1 flex items-center",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  });
}

function SidebarMenuAction({ className, asChild = false, showOnHover = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return React.createElement(Comp, {
    "data-sidebar": "menu-action",
    className: cn(
      "text-sidebar-foreground hover:text-sidebar-accent-foreground peer/menu-button absolute right-1 flex size-7 items-center justify-between rounded-md p-0 outline-hidden transition-all focus-visible:ring-2 focus-visible:ring-sidebar-ring",
      "group-data-[collapsible=icon]:hidden",
      showOnHover &&
        "peer-hover/menu-button:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 opacity-0",
      className
    ),
    ...props
  });
}

function SidebarMenuSkeleton({ className, showIcon = false, ...props }) {
  return React.createElement("div", {
    "data-sidebar": "menu-skeleton",
    className: cn("rounded-md px-2 py-4", className),
    ...props
  },
    showIcon && React.createElement(Skeleton, { className: "size-5 rounded-full" })
  );
}

function SidebarMenuSub({ className, ...props }) {
  return React.createElement("ul", {
    "data-sidebar": "menu-sub",
    className: cn(
      "mx-3.5 mt-1 flex min-w-0 translate-x-px flex-col gap-1 border-l px-0",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  });
}

function SidebarMenuSubItem({ className, ...props }) {
  return React.createElement("li", {
    "data-sidebar": "menu-sub-item",
    className: cn("group/menu-sub-item relative", className),
    ...props
  });
}

function SidebarMenuSubButton({ asChild = false, size = "md", isActive = false, className, ...props }) {
  const Comp = asChild ? Slot : "a";

  return React.createElement(Comp, {
    "data-sidebar": "menu-sub-button",
    "data-size": size,
    "data-active": isActive,
    className: cn(
      "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
      "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
      size === "sm" && "text-xs",
      size === "md" && "text-sm",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  });
}

function SidebarTrigger({ className, ...props }) {
  const { toggleSidebar } = useSidebar();

  return React.createElement(Button, {
    size: "icon",
    variant: "ghost",
    "aria-label": "Toggle Sidebar",
    onClick: toggleSidebar,
    className: cn("size-9", className),
    ...props
  },
    React.createElement(PanelLeftIcon, { className: "size-5" })
  );
}

function SidebarRail() {
  return React.createElement("div", {
    "data-sidebar": "rail",
    className: "absolute -right-px top-1/2 h-8 w-px -translate-y-1/2 transition-all duration-300 ease-in-out bg-sidebar-border group-data-[collapsible=icon]:opacity-0 group-data-[state=collapsed]:opacity-0"
  });
}

function SidebarInset({ className, ...props }) {
  return React.createElement("main", {
    className: cn(
      "relative flex min-h-svh flex-1 flex-col bg-background",
      className
    ),
    ...props
  });
}

function SidebarInput({ className, ...props }) {
  return React.createElement(Input, {
    className: cn(
      "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
      className
    ),
    ...props
  });
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
};