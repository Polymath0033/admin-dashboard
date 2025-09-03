export type Role = 'Admin' | 'Editor' | 'User';
export type Status = 'Active' | 'Inactive' | 'Pending';
export type Timezone = 'UTC' | 'GMT' | 'CET' | 'EST' | 'PST';
export type AdminProfile ={
    siteName: string;
    email: string;
    timezone: Timezone;
    notificationCount: number;
    notifications: { email: boolean; sms: boolean; push: boolean };
}

export type Users = {
    id: number;
    name: string;
    email: string;
    role: Role;
    status: Status;
};