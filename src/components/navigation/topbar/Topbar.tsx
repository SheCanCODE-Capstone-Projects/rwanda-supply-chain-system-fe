import {NotificationMenu} from "../notification-menu";
import { UserMenu } from "../user-menu";
export function Topbar(){
    return (
        <header className=" h-16 border-b bg-white flex items-center justify-between px-6">
            <input placeholder="Search..." className=" border rounded-xl px-4 h-10"/>
            <div className="flex gap-4">
                <NotificationMenu/>
                <UserMenu/>
            </div>
        </header>
    );
}