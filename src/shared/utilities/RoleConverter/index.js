import { ROLE } from "@/constants/role";

export default function RoleConverter(role) {
    switch (role) {
        case "user":
            return ROLE.ADMIN;
        case "mod":
            return ROLE.MOD;
        case "admin":
            return ROLE.USER;
    }
}