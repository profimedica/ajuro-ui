/**
 * aju-ro - Advanced Controls Library with demo on www.aju.ro
 * @version v0.1.0
 * @link http://www.aju.ro/
 * @license MIT
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = (function () {
    function List(eGridDiv, gridOptions, params) {
        /*if (!eGridDiv) {
            console.error('ag-Grid: no div element provided to the grid');
        }
        if (!gridOptions) {
            console.error('ag-Grid: no gridOptions provided to the grid');
        }
        var rowModelClass = this.getRowModelClass(gridOptions);
        var enterprise = utils_1.Utils.exists(List.enterpriseBeans);
        var frameworkFactory = params ? params.frameworkFactory : null;
        if (utils_1.Utils.missing(frameworkFactory)) {
            frameworkFactory = new baseFrameworkFactory_1.BaseFrameworkFactory();
        }
        var overrideBeans = [];
        if (List.enterpriseBeans) {
            overrideBeans = overrideBeans.concat(List.enterpriseBeans);
        }
        if (List.frameworkBeans) {
            overrideBeans = overrideBeans.concat(List.frameworkBeans);
        }
        var seed = {
            enterprise: enterprise,
            gridOptions: gridOptions,
            eGridDiv: eGridDiv,
            $scope: params ? params.$scope : null,
            $compile: params ? params.$compile : null,
            quickFilterOnScope: params ? params.quickFilterOnScope : null,
            globalEventListener: params ? params.globalEventListener : null,
            frameworkFactory: frameworkFactory
        };
        if (params && params.seedBeanInstances) {
            utils_1.Utils.assign(seed, params.seedBeanInstances);
        }
        var contextParams = {
            overrideBeans: overrideBeans,
            seed: seed,
            beans: [rowModelClass, paginationProxy_1.PaginationAutoPageSizeService, gridApi_1.GridApi, componentProvider_1.ComponentProvider, cellRendererFactory_1.CellRendererFactory,
                horizontalDragService_1.HorizontalDragService, headerTemplateLoader_1.HeaderTemplateLoader, pinnedRowModel_1.PinnedRowModel, dragService_1.DragService,
                displayedGroupCreator_1.DisplayedGroupCreator, eventService_1.EventService, gridOptionsWrapper_1.GridOptionsWrapper, selectionController_1.SelectionController,
                filterManager_1.FilterManager, columnController_1.ColumnController, paginationProxy_1.PaginationProxy, rowRenderer_1.RowRenderer, headerRenderer_1.HeaderRenderer, expressionService_1.ExpressionService,
                balancedColumnTreeBuilder_1.BalancedColumnTreeBuilder, csvCreator_1.CsvCreator, downloader_1.Downloader, xmlFactory_1.XmlFactory, gridSerializer_1.GridSerializer, templateService_1.TemplateService,
                gridPanel_1.GridPanel, popupService_1.PopupService, valueCache_1.ValueCache, valueService_1.ValueService, alignedGridsService_1.AlignedGridsService,
                logger_1.LoggerFactory, columnUtils_1.ColumnUtils, autoWidthCalculator_1.AutoWidthCalculator, popupService_1.PopupService, gridCore_1.GridCore, standardMenu_1.StandardMenuFactory,
                dragAndDropService_1.DragAndDropService, sortController_1.SortController, columnController_1.ColumnApi, focusedCellController_1.FocusedCellController, mouseEventService_1.MouseEventService,
                cellNavigationService_1.CellNavigationService, filterStage_1.FilterStage, sortStage_1.SortStage, flattenStage_1.FlattenStage, focusService_1.FocusService, filterService_1.FilterService, rowNodeFactory_1.RowNodeFactory,
                cellEditorFactory_1.CellEditorFactory, cellRendererService_1.CellRendererService, valueFormatterService_1.ValueFormatterService, stylingService_1.StylingService, scrollVisibleService_1.ScrollVisibleService,
                columnHoverService_1.ColumnHoverService, columnAnimationService_1.ColumnAnimationService, sortService_1.SortService, autoGroupColService_1.AutoGroupColService, immutableService_1.ImmutableService,
                changeDetectionService_1.ChangeDetectionService],
            components: [
                { componentName: 'AgCheckbox', theClass: agCheckbox_1.AgCheckbox }
            ],
            debug: !!gridOptions.debug
        };
        var isLoggingFunc = function () { return contextParams.debug; };
        this.context = new context_1.Context(contextParams, new logger_1.Logger('Context', isLoggingFunc));
        // we do this at the end, after the boot sequence is complete
        this.setColumnsAndData();
        this.dispatchGridReadyEvent(gridOptions);
        if (gridOptions.debug) {
            console.log('ag-Grid -> initialised successfully, enterprise = ' + enterprise);
        }
    }
    List.setEnterpriseBeans = function (enterpriseBeans, rowModelClasses) {
        this.enterpriseBeans = enterpriseBeans;
        // the enterprise can inject additional row models. this is how it injects the viewportRowModel
        utils_1.Utils.iterateObject(rowModelClasses, function (key, value) { return Grid.RowModelClasses[key] = value; });
    };
    List.setFrameworkBeans = function (frameworkBeans) {
        this.frameworkBeans = frameworkBeans;
    };
    List.prototype.setColumnsAndData = function () {
        var gridOptionsWrapper = this.context.getBean('gridOptionsWrapper');
        var columnController = this.context.getBean('columnController');
        var rowModel = this.context.getBean('rowModel');
        var columnDefs = gridOptionsWrapper.getColumnDefs();
        var rowData = gridOptionsWrapper.getRowData();
        var nothingToSet = utils_1.Utils.missing(columnDefs) && utils_1.Utils.missing(rowData);
        if (nothingToSet) {
            return;
        }
        var valueService = this.context.getBean('valueService');
        if (utils_1.Utils.exists(columnDefs)) {
            columnController.setColumnDefs(columnDefs);
        }
        if (utils_1.Utils.exists(rowData) && rowModel.getType() === constants_1.Constants.ROW_MODEL_TYPE_IN_MEMORY) {
            var inMemoryRowModel = rowModel;
            inMemoryRowModel.setRowData(rowData);
        }
    };
    List.prototype.dispatchGridReadyEvent = function (gridOptions) {
        var eventService = this.context.getBean('eventService');
        var readyEvent = {
            api: gridOptions.api,
            columnApi: gridOptions.columnApi
        };
        eventService.dispatchEvent(events_1.Events.EVENT_GRID_READY, readyEvent);
    };
    List.prototype.getRowModelClass = function (gridOptions) {
        var rowModelType = gridOptions.rowModelType;
        if (utils_1.Utils.exists(rowModelType)) {
            var rowModelClass = Grid.RowModelClasses[rowModelType];
            if (utils_1.Utils.exists(rowModelClass)) {
                return rowModelClass;
            }
            else {
                if (rowModelType === 'normal') {
                    console.warn("ag-Grid: normal rowModel deprecated. Should now be called inMemory rowModel instead.");
                    return inMemoryRowModel_1.InMemoryRowModel;
                }
                console.error('ag-Grid: could not find matching row model for rowModelType ' + rowModelType);
                if (rowModelType === 'viewport') {
                    console.error('ag-Grid: rowModelType viewport is only available in ag-Grid Enterprise');
                }
                if (rowModelType === 'enterprise') {
                    console.error('ag-Grid: rowModelType viewport is only available in ag-Grid Enterprise');
                }
            }
        }
        return inMemoryRowModel_1.InMemoryRowModel;
    };
    ;
    List.prototype.destroy = function () {
        this.context.destroy();
    };
    // the default is InMemoryRowModel, which is also used for pagination.
    // the enterprise adds viewport to this list.
    List.RowModelClasses = {
        infinite: infiniteRowModel_1.InfiniteRowModel,
        inMemory: inMemoryRowModel_1.InMemoryRowModel
        */
    }
    return List;
}());
exports.List = List;
