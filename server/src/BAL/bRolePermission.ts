import { RolePermission } from "../DAL/RolePermission";
import { Response } from "../DAL/Response";
import { Op } from "sequelize";

// export async function GetRolePermissionByRoleId (request: [string]): Promise<Response> {
//     const rolePermission = await RolePermission.findAll({ where: { roleId: { [Op.in]: request } ,deleted: false }, order:  })

// }