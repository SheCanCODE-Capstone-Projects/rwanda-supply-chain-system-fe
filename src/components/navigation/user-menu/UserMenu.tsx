import {Avatar} from "@/components/ui/avatar";


export function UserMenu(){
    return (
        <div className="flex items-center gap-3">
            <Avatar name="User"/>
            <div>
                <p className="font-medium">
                    User Name
                </p>
                <p className="text-xs text-gray-500">
                    Role
                </p>
            </div>
        </div>
    );
}