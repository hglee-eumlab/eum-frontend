import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarIcon,
  ChevronDown,
  Mail,
  User,
  BarChart3,
  FileText,
  Trash2,
  Bell,
  Building2,
} from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Checkbox,
  Icon,
  LNB,
  LNBHeader,
  LNBFooter,
  LNBContent,
  LNBTitle,
  LNBGroup,
  LNBItem,
  LNBCollapsibleItem,
  LNBSubGroup,
  LNBSubItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Divider,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  Skeleton,
  Switch,
  Toggle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  CustomCalendar,
} from "@eum/design-system";
import type { ChartConfig } from "@eum/design-system";
import type { DateRange } from "react-day-picker";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const Route = createFileRoute("/design-system/components")({
  component: ComponentsShowcase,
});

const chartData = [
  { month: "1월", value: 186 },
  { month: "2월", value: 305 },
  { month: "3월", value: 237 },
  { month: "4월", value: 273 },
  { month: "5월", value: 209 },
  { month: "6월", value: 214 },
];

const chartConfig = {
  value: {
    label: "방문자",
    color: "hsl(var(--primary-400))",
  },
} satisfies ChartConfig;

// NEW Badge Component
function NEWBadge() {
  return (
    <Badge className="ml-2 animate-pulse bg-primary-400 text-primary-900 hover:bg-primary-500">
      NEW
    </Badge>
  );
}

function ComponentsShowcase() {
  const [date, setDate] = useState<Date | undefined>(() => new Date());
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [singleDate, setSingleDate] = useState<Date | undefined>(
    () => new Date(),
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  }));

  return (
    <>
      {/* Header Section */}
      <header className="border-b border-neutral-150 bg-background px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-800">
            E-um Design System
          </h1>
          <p className="mt-2 text-lg text-neutral-500">UI Components</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-8 py-12">
        <Tabs defaultValue="design-system" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-5">
            <TabsTrigger value="design-system">Design System</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="data">Data Display</TabsTrigger>
            <TabsTrigger value="overlay">Overlay</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          {/* Design System Tab */}
          <TabsContent value="design-system">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Icon */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Icon
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                      NEW
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Design system icons with size and color variants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Available Icons
                    </Label>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="company" />
                        <span className="text-[10px] text-neutral-500">
                          company
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="report" />
                        <span className="text-[10px] text-neutral-500">
                          report
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="file" />
                        <span className="text-[10px] text-neutral-500">
                          file
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="notice" />
                        <span className="text-[10px] text-neutral-500">
                          notice
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="user" />
                        <span className="text-[10px] text-neutral-500">
                          user
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="alarm" />
                        <span className="text-[10px] text-neutral-500">
                          alarm
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="trash" />
                        <span className="text-[10px] text-neutral-500">
                          trash
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="plus" />
                        <span className="text-[10px] text-neutral-500">
                          plus
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="check" />
                        <span className="text-[10px] text-neutral-500">
                          check
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="close" />
                        <span className="text-[10px] text-neutral-500">
                          close
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Sizes
                    </Label>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="company" size="sm" />
                        <span className="text-[10px] text-neutral-500">
                          sm (16px)
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="company" size="md" />
                        <span className="text-[10px] text-neutral-500">
                          md (20px)
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="company" size="lg" />
                        <span className="text-[10px] text-neutral-500">
                          lg (24px)
                        </span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Colors
                    </Label>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="company" color="primary" />
                        <span className="text-[10px] text-neutral-500">
                          primary
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="company" color="secondary" />
                        <span className="text-[10px] text-neutral-500">
                          secondary
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="company" color="tertiary" />
                        <span className="text-[10px] text-neutral-500">
                          tertiary
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="check" color="success" />
                        <span className="text-[10px] text-neutral-500">
                          success
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="close" color="danger" />
                        <span className="text-[10px] text-neutral-500">
                          danger
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Divider */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Divider
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                      NEW
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Semantic dividers with variant and spacing options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Variants
                    </Label>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] text-neutral-500">
                          default
                        </span>
                        <Divider variant="default" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500">
                          subtle
                        </span>
                        <Divider variant="subtle" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500">
                          strong
                        </span>
                        <Divider variant="strong" />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Spacing
                    </Label>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] text-neutral-500">
                          none
                        </span>
                        <Divider spacing="none" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500">
                          sm (8px)
                        </span>
                        <Divider spacing="sm" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500">
                          md (16px)
                        </span>
                        <Divider spacing="md" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500">
                          lg (24px)
                        </span>
                        <Divider spacing="lg" />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Vertical
                    </Label>
                    <div className="flex h-20 items-center space-x-4">
                      <div className="text-sm">Left</div>
                      <Divider orientation="vertical" />
                      <div className="text-sm">Right</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* LNB */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    LNB - Left Navigation Bar
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                      NEW
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Hierarchical navigation for application sidebars with
                    collapsible sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-xs rounded-lg border">
                    <LNB>
                      <LNBHeader>
                        <Building2 className="mr-2 h-5 w-5" />
                        <span className="text-sm font-semibold">
                          E-um Dashboard
                        </span>
                      </LNBHeader>
                      <LNBContent>
                        <LNBGroup>
                          <LNBTitle>MAIN MENU</LNBTitle>
                          <LNBItem isActive icon={<BarChart3 />}>
                            대시보드
                          </LNBItem>
                          <LNBCollapsibleItem icon={<FileText />} defaultOpen>
                            {[
                              "문서 관리",
                              <LNBSubGroup key="docs-sub">
                                <LNBSubItem isActive>전체 문서</LNBSubItem>
                                <LNBSubItem>최근 문서</LNBSubItem>
                                <LNBSubItem>공유 문서</LNBSubItem>
                              </LNBSubGroup>,
                            ]}
                          </LNBCollapsibleItem>
                          <LNBItem icon={<Bell />}>공지사항</LNBItem>
                        </LNBGroup>
                        <LNBGroup>
                          <LNBTitle>OTHER</LNBTitle>
                          <LNBItem icon={<User />}>프로필</LNBItem>
                          <LNBItem isDisabled icon={<Mail />}>
                            메시지 (준비중)
                          </LNBItem>
                        </LNBGroup>
                      </LNBContent>
                      <LNBFooter>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                            <User className="h-4 w-4 text-primary-700" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">관리자</p>
                            <p className="text-[10px] text-neutral-500">
                              admin@e-um.com
                            </p>
                          </div>
                        </div>
                      </LNBFooter>
                    </LNB>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Button */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Button
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                      NEW
                    </span>
                  </CardTitle>
                  <CardDescription>
                    E-um Design System button variants and sizes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Variants
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary-fill">Primary Fill</Button>
                      <Button variant="primary-line">Primary Line</Button>
                      <Button variant="neutral-fill">Neutral Fill</Button>
                      <Button variant="neutral-line">Neutral Line</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Sizes
                    </Label>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="sm">Small (40px)</Button>
                      <Button size="md">Medium (48px)</Button>
                      <Button size="lg">Large (56px)</Button>
                      <Button size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Checkbox */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Checkbox
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                      NEW
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Select multiple options with size variants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Medium (20px, default)
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        size="md"
                        checked={checked}
                        onCheckedChange={(c) => setChecked(c as boolean)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accept terms and conditions
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Small (16px)
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" size="sm" />
                      <label
                        htmlFor="marketing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Send me marketing emails
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Input */}
              <Card>
                <CardHeader>
                  <CardTitle>Input</CardTitle>
                  <CardDescription>
                    Text input fields for user data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="text" placeholder="Text input" />
                  <Input type="email" placeholder="Email input" />
                  <Input type="password" placeholder="Password input" />
                  <Input type="text" placeholder="Disabled input" disabled />
                </CardContent>
              </Card>

              {/* Label */}
              <Card>
                <CardHeader>
                  <CardTitle>Label</CardTitle>
                  <CardDescription>
                    Accessible labels for form controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-label">Email</Label>
                    <Input
                      id="email-label"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username-label">Username</Label>
                    <Input
                      id="username-label"
                      type="text"
                      placeholder="Enter your username"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Select */}
              <Card>
                <CardHeader>
                  <CardTitle>Select</CardTitle>
                  <CardDescription>Dropdown selection menus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="grape">Grape</SelectItem>
                      <SelectItem value="mango">Mango</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Switch/Toggle */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Switch / Toggle
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                      NEW
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Toggle between on and off states with size variants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Medium (default)
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="airplane-mode"
                        size="md"
                        checked={switchOn}
                        onCheckedChange={setSwitchOn}
                      />
                      <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-neutral-600">
                      Small
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Toggle id="marketing-emails" size="sm" />
                      <Label htmlFor="marketing-emails">Marketing emails</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>
                    Select dates with an interactive calendar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                  {date && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Selected: {format(date, "PPP", { locale: ko })}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Custom Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle>Custom Calendar</CardTitle>
                  <CardDescription>
                    Enhanced calendar with text input and range selection with
                    auto-adjust
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Single Mode</Label>
                    <CustomCalendar
                      mode="single"
                      date={singleDate}
                      onDateChange={setSingleDate}
                    />
                    {singleDate && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {format(singleDate, "PPP", { locale: ko })}
                      </p>
                    )}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Range Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Start &gt; End: End auto-adjusts to Start + 1 day / End
                      &lt; Start: Start auto-adjusts to End - 1 day
                    </p>
                    <CustomCalendar
                      mode="range"
                      dateRange={dateRange}
                      onDateRangeChange={setDateRange}
                    />
                    {dateRange?.from && dateRange?.to && (
                      <p className="text-sm text-muted-foreground">
                        {format(dateRange.from, "PPP", { locale: ko })} ~{" "}
                        {format(dateRange.to, "PPP", { locale: ko })}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Date Picker */}
              <Card>
                <CardHeader>
                  <CardTitle>Date Picker</CardTitle>
                  <CardDescription>
                    Pick dates with a popover calendar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="neutral-line"
                        className="w-[280px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP", { locale: ko })
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                      />
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Data Display Tab */}
          <TabsContent value="data">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Avatar */}
              <Card>
                <CardHeader>
                  <CardTitle>Avatar</CardTitle>
                  <CardDescription>
                    Display user profile images with fallbacks
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="/invalid-url.png" alt="@user" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>

              {/* Icon */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Icon
                    <NEWBadge />
                  </CardTitle>
                  <CardDescription>
                    E-um Design System icons with variants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Named Icons</h4>
                    <div className="flex gap-4">
                      <Icon name="company" size="lg" color="primary" />
                      <Icon name="report" size="lg" color="secondary" />
                      <Icon name="file" size="lg" color="inherit" />
                      <Icon name="user" size="lg" color="success" />
                      <Icon name="trash" size="lg" color="danger" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sizes</h4>
                    <div className="flex items-center gap-4">
                      <Icon name="user" size="sm" />
                      <Icon name="user" size="md" />
                      <Icon name="user" size="lg" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badge */}
              <Card>
                <CardHeader>
                  <CardTitle>Badge</CardTitle>
                  <CardDescription>
                    Display labels and status indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </CardContent>
              </Card>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Chart</CardTitle>
                  <CardDescription>
                    Visualize data with recharts integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[200px] w-full"
                  >
                    <BarChart accessibilityLayer data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="value"
                        fill="var(--color-value)"
                        radius={8}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Table</CardTitle>
                  <CardDescription>
                    Display data in rows and columns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>A list of recent invoices</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV002</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV003</TableCell>
                        <TableCell>Unpaid</TableCell>
                        <TableCell>Bank Transfer</TableCell>
                        <TableCell className="text-right">$350.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">INV004</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$450.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Skeleton */}
              <Card>
                <CardHeader>
                  <CardTitle>Skeleton</CardTitle>
                  <CardDescription>
                    Loading placeholders for content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-[125px] w-full" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Overlay Tab */}
          <TabsContent value="overlay">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Dialog */}
              <Card>
                <CardHeader>
                  <CardTitle>Dialog</CardTitle>
                  <CardDescription>
                    Modal dialogs for user interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="neutral-line">Cancel</Button>
                        <Button>Continue</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Sheet */}
              <Card>
                <CardHeader>
                  <CardTitle>Sheet</CardTitle>
                  <CardDescription>
                    Slide-out panels from the screen edge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button>Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            value="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardContent>
              </Card>

              {/* Popover */}
              <Card>
                <CardHeader>
                  <CardTitle>Popover</CardTitle>
                  <CardDescription>
                    Display content in a floating panel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="neutral-line">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                          Set the dimensions for the layer.
                        </p>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Width</Label>
                            <Input
                              id="width"
                              defaultValue="100%"
                              className="col-span-2 h-8"
                            />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Max. width</Label>
                            <Input
                              id="maxWidth"
                              defaultValue="300px"
                              className="col-span-2 h-8"
                            />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>

              {/* Tooltip */}
              <Card>
                <CardHeader>
                  <CardTitle>Tooltip</CardTitle>
                  <CardDescription>
                    Display helpful information on hover
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="neutral-line">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to library</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
              </Card>

              {/* Dropdown Menu */}
              <Card>
                <CardHeader>
                  <CardTitle>Dropdown Menu</CardTitle>
                  <CardDescription>
                    Display contextual actions and options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="neutral-line">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={showStatusBar}
                        onCheckedChange={setShowStatusBar}
                      >
                        Status Bar
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Card</CardTitle>
                  <CardDescription>
                    Container for grouping related content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Example</CardTitle>
                      <CardDescription>
                        This is a nested card demonstration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Cards can contain headers, content, and footers. They're
                        perfect for organizing information in a structured way.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="neutral-line">Cancel</Button>
                      <Button>Save</Button>
                    </CardFooter>
                  </Card>
                </CardContent>
              </Card>

              {/* Collapsible */}
              <Card>
                <CardHeader>
                  <CardTitle>Collapsible</CardTitle>
                  <CardDescription>
                    Expand and collapse content sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Collapsible
                    open={collapsibleOpen}
                    onOpenChange={setCollapsibleOpen}
                  >
                    <div className="flex items-center justify-between space-x-4">
                      <h4 className="text-sm font-semibold">
                        @peduarte starred 3 repositories
                      </h4>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${collapsibleOpen ? "rotate-180" : ""}`}
                          />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <div className="mt-2 rounded-md border px-4 py-3 font-mono text-sm">
                      @radix-ui/primitives
                    </div>
                    <CollapsibleContent className="space-y-2 pt-2">
                      <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/colors
                      </div>
                      <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @stitches/react
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Scroll Area */}
              <Card>
                <CardHeader>
                  <CardTitle>Scroll Area</CardTitle>
                  <CardDescription>Custom scrollable containers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="text-sm">
                          Item {i + 1} - This is a scrollable item in the scroll
                          area
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Separator / Divider */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Separator / Divider
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                      NEW
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Visual dividers between content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm">Section 1</div>
                    <Separator className="my-4" />
                    <div className="text-sm">Section 2</div>
                  </div>
                  <div className="flex h-20 items-center space-x-4">
                    <div className="text-sm">Left</div>
                    <Separator orientation="vertical" />
                    <div className="text-sm">Right</div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs text-neutral-500">
                      With Divider variants:
                    </span>
                    <Divider variant="subtle" />
                    <Divider variant="default" />
                    <Divider variant="strong" />
                  </div>
                </CardContent>
              </Card>

              {/* Tabs Component */}
              <Card>
                <CardHeader>
                  <CardTitle>Tabs Component</CardTitle>
                  <CardDescription>
                    Organize content into tabbed sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input placeholder="@username" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Make changes to your account here.
                      </p>
                    </TabsContent>
                    <TabsContent value="password" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input type="password" />
                      </div>
                    </TabsContent>
                    <TabsContent value="settings" className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        Settings panel content goes here.
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Sidebar */}
              <Card>
                <CardHeader>
                  <CardTitle>Sidebar</CardTitle>
                  <CardDescription>
                    Navigation sidebar components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full overflow-hidden rounded-lg border">
                    <SidebarProvider>
                      <Sidebar collapsible="none">
                        <SidebarHeader>
                          <div className="px-4 py-2 text-sm font-semibold">
                            Application
                          </div>
                        </SidebarHeader>
                        <SidebarContent>
                          <SidebarGroup>
                            <SidebarGroupLabel>Menu</SidebarGroupLabel>
                            <SidebarMenu>
                              <SidebarMenuItem>
                                <SidebarMenuButton>Dashboard</SidebarMenuButton>
                              </SidebarMenuItem>
                              <SidebarMenuItem>
                                <SidebarMenuButton>Projects</SidebarMenuButton>
                              </SidebarMenuItem>
                              <SidebarMenuItem>
                                <SidebarMenuButton>Tasks</SidebarMenuButton>
                              </SidebarMenuItem>
                              <SidebarMenuItem>
                                <SidebarMenuButton>Settings</SidebarMenuButton>
                              </SidebarMenuItem>
                            </SidebarMenu>
                          </SidebarGroup>
                        </SidebarContent>
                      </Sidebar>
                      <main className="flex flex-1 flex-col items-center justify-center bg-muted/40 p-4">
                        <p className="text-sm text-muted-foreground">
                          Content area
                        </p>
                      </main>
                    </SidebarProvider>
                  </div>
                </CardContent>
              </Card>

              {/* LNB (Left Navigation Bar) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    LNB
                    <NEWBadge />
                  </CardTitle>
                  <CardDescription>
                    E-um Left Navigation Bar with collapsible sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full overflow-hidden rounded-lg border bg-[var(--bg-base-primary)]">
                    <LNB>
                      <LNBHeader>
                        <Building2 className="mr-2 h-5 w-5" />
                        <span className="text-sm font-semibold">
                          Application
                        </span>
                      </LNBHeader>
                      <LNBContent>
                        <LNBGroup>
                          <LNBTitle>MAIN MENU</LNBTitle>
                          <LNBItem isActive icon={<BarChart3 />}>
                            Dashboard
                          </LNBItem>
                          <LNBCollapsibleItem icon={<FileText />} defaultOpen>
                            {[
                              "Reports",
                              <LNBSubGroup key="reports-sub">
                                <LNBSubItem isActive>All Reports</LNBSubItem>
                                <LNBSubItem>Recent</LNBSubItem>
                                <LNBSubItem>Shared</LNBSubItem>
                              </LNBSubGroup>,
                            ]}
                          </LNBCollapsibleItem>
                          <LNBItem icon={<Bell />}>Notifications</LNBItem>
                        </LNBGroup>
                        <LNBGroup>
                          <LNBTitle>SETTINGS</LNBTitle>
                          <LNBItem icon={<User />}>Profile</LNBItem>
                          <LNBItem icon={<Trash2 />}>Settings</LNBItem>
                        </LNBGroup>
                      </LNBContent>
                      <LNBFooter>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                            <User className="h-4 w-4 text-primary-700" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">User Name</p>
                            <p className="text-[10px] text-neutral-500">
                              user@example.com
                            </p>
                          </div>
                        </div>
                      </LNBFooter>
                    </LNB>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
