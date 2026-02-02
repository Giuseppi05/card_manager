import { Role } from "@prisma/client";

const PERMISSION_DEFINITION = {
    games: [
        "readAll",
        "readAllByUser",
        "readAllActiveByUser",
        "readOne",
        "create",
        "update",
        "delete",
        "addToUser"
    ],
    expansion: [
        "readAll",
        "readOne",
        "readUnactive",
        "create",
        "update",
        "delete"
    ],
    generation: [
        "readAll",
        "readOne",
        "create",
        "update",
        "delete"
    ],
    card: [
        "readAll",
        "readOne",
        "create",
        "update",
        "delete"
    ],
    classes: [
        "readAll",
        "readOne",
        "create",
        "update",
        "delete"
    ],
    affiliation: [
        "readAll",
        "readOne",
        "create",
        "update",
        "delete"
    ],
    logo: [
        "readAll",
        "readOne",
        "create",
        "update",
        "delete"
    ],
    role: [
        "readAll",
        "readOne",
        "create",
        "update",
        "delete"
    ],
    users: [
        "readAll",
        "readOne",
        "create",
        "update",
        "delete"
    ],
} as const;

const DEFAULT_PERMISSION = false;

type PermissionGroup = keyof typeof PERMISSION_DEFINITION;
type PermissionAction<G extends PermissionGroup> =
    typeof PERMISSION_DEFINITION[G][number];

export function can(
    role: Role & { permissions: any },
    group: PermissionGroup,
    action: PermissionAction<typeof group>
): boolean {
    if (role.name === "ADMIN") return true;

    return (
        role.permissions?.[group]?.[action] ?? DEFAULT_PERMISSION
    );
}
