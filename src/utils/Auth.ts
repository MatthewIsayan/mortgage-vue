export enum Role {
    None = "None",
    GuestBorrower = "Guest Borrower",
    Borrower = "Borrower",
    LoanOfficer = "Loan Officer",
}

export enum Permission {
    ViewLoanOfficerDashboard = "View Loan Officer Dashboard",
    ViewBorrowerDashboard = "View Borrower Dashboard",
    ViewGetQuote = "View Get Quote",
    ViewScenario = "View Scenario",
    CreateScenario = "Create Scenario",
    OrderCreditReport = "Order Credit Report",
}

export interface User {
    id: string;
    name: string;
    role: Role;
}

interface RoleWithPermissions {
    role: Role;
    permissions: Permission[];
}

const rolesWithPermissions: RoleWithPermissions[] = [
    {
        role: Role.None,
        permissions: [],
    },
    {
        role: Role.GuestBorrower,
        permissions: [Permission.ViewGetQuote, Permission.ViewScenario],
    },
    {
        role: Role.Borrower,
        permissions: [
            Permission.ViewBorrowerDashboard,
            Permission.ViewGetQuote,
            Permission.ViewScenario,
        ],
    },
    {
        role: Role.LoanOfficer,
        permissions: [
            Permission.ViewLoanOfficerDashboard,
            Permission.ViewScenario,
            Permission.CreateScenario,
            Permission.OrderCreditReport,
        ],
    },
];

export function getPermissionsForRole(role: Role): Permission[] {
    const roleWithPermissions = rolesWithPermissions.find(
        (r) => r.role === role
    );
    return roleWithPermissions ? roleWithPermissions.permissions : [];
}

export function hasPermission(
    role: Role,
    requiredPermission: Permission
): Boolean {
    const userPermissions = getPermissionsForRole(role);
    return userPermissions.includes(requiredPermission);
}
