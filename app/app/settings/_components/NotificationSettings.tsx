import { Switch } from '@/components/ui/switch'

export function NotificationSettings({
  isAllowNotification,
  handleSetNotificationPermission,
}: {
  isAllowNotification: boolean
  handleSetNotificationPermission: (v: boolean) => void
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row">
      <div className="flex-1 shrink-0">
        <h1 className="mb-1 font-bold">Notifications</h1>
        <p className="text-xs text-muted-foreground">Manage how you receive your notifications</p>
      </div>
      <div className="flex flex-[2] flex-col gap-4">
        {/* <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1">Email</h1>
            <p className="text-xs text-muted-foreground">Receive notifications via email</p>
          </div>
          <Switch />
        </div> */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1">Web Application</h1>
            <p className="text-xs text-muted-foreground">Receive notifications via web app</p>
          </div>
          <Switch checked={isAllowNotification} onCheckedChange={handleSetNotificationPermission} />
        </div>
      </div>
    </div>
  )
}
