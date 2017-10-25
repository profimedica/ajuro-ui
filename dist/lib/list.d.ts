// Type definitions for ajuro-ui v0.1.0
// Project: http://www.aju.ro/
// Definitions by: Niall Crosby <https://github.com/profimedica/>
import { IFrameworkFactory } from "./interfaces/iFrameworkFactory";
export interface ListParams {
    globalEventListener?: Function;
    $scope?: any;
    $compile?: any;
    quickFilterOnScope?: any;
    frameworkFactory?: IFrameworkFactory;
    seedBeanInstances?: {
        [key: string]: any;
    };
}
export declare class List {
    private context;
    private static enterpriseBeans;
    private static frameworkBeans;
    private static RowModelClasses;
    /*static setEnterpriseBeans(enterpriseBeans: any[], rowModelClasses: any): void;
    static setFrameworkBeans(frameworkBeans: any[]): void;
    constructor(eGridDiv: HTMLElement, gridOptions: GridOptions, params?: GridParams);
    private setColumnsAndData();
    private dispatchGridReadyEvent(gridOptions);
    private getRowModelClass(gridOptions);*/
    destroy(): void;
}
