// Type definitions for ajuro-ui v0.1.0
// Project: http://www.aju.ro/
// Definitions by: Florin Cumpanasu <https://github.com/profimedica/>
/*import { RowNode } from "./rowNode";
import { GridApi } from "../gridApi";
import { ColumnApi } from "../columnController/columnController";
import { Column } from "./column";
import { IViewportDatasource } from "../interfaces/iViewportDatasource";
import { ICellRendererFunc, ICellRendererComp } from "../rendering/cellRenderers/iCellRenderer";
import { IAggFunc, ColGroupDef, ColDef } from "./colDef";
import { IDatasource } from "../rowModels/iDatasource";
import { GridCellDef } from "./gridCell";
import { IDateComp } from "../rendering/dateComponent";
import { IEnterpriseDatasource } from "../interfaces/iEnterpriseDatasource";
import { CsvExportParams, ProcessCellForExportParams } from "../exportParams";*/
/****************************************************************
 * Don't forget to update ComponentUtil if changing this class. *
 ****************************************************************/
export interface ListOptions {
    /****************************************************************
     * Don't forget to update ComponentUtil if changing this class. PLEASE!*
     ****************************************************************/

}
export interface GetNodeChildDetails {
    (dataItem: any): NodeChildDetails;
}
export interface NodeChildDetails {
    group: boolean;
    children?: any[];
    expanded?: boolean;
    field?: string;
    key?: any;
}
export interface GetContextMenuItemsParams {
    defaultItems: string[];
    value: any;
    context: any;
}
export interface GetContextMenuItems {

}
export interface MenuItemDef {
    name: string;
    disabled?: boolean;
    shortcut?: string;
    action?: () => void;
    checked?: boolean;
    cssClasses?: string[];
    tooltip?: string;
}
export interface GetMainMenuItemsParams {
    context: any;
    defaultItems: string[];
}
export interface GetMainMenuItems {

}
export interface GetRowNodeIdFunc {
    (data: any): string;
}
export interface ProcessRowParams {
    context: any;
}
export interface NavigateToNextCellParams {
    key: number;
}
export interface TabToNextCellParams {
    backwards: boolean;
    editing: boolean;
}
export interface PostProcessPopupParams {
    type: string;
}
