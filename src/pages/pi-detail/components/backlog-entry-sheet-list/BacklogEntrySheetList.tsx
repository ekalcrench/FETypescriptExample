import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { SearchInput } from '../../../../components/search-input/SearchInput';
import { BacklogEntrySheetListProps } from './BacklogEntrySheetList.model';
import './BacklogEntrySheetList.scss';
import { PencilYellow } from '../../../../assets/icons';

export class BacklogEntrySheetTable extends React.PureComponent<BacklogEntrySheetListProps> {
    render() {
        const list = this.props.backlogList.listBacklog || []
        if (this.props.displayMode === 'mobile') {
            return (
                <div>
                    {
                        this.props.backlogList.listBacklog && this.props.backlogList.listBacklog.map((row, index) => {
                            return (
                               <Card key={index} onClick={() => {this.props.onClickBesList(row.backlogId || '')}} className="backlog-job-list-mobile-card">
                                   <CardContent className="job-list-mobile-content">
                                        <div className="job-list-row">
                                            <div className="job-list-detail-container">
                                                <div className="job-list-label">Work Order</div>
                                                <div className="job-list-detail">{row.woNumber || '-'}</div>
                                            </div>
                                            <div className="job-list-detail-container">
                                                <div className="job-list-label">Work Zone</div>
                                                <div className="job-list-detail">{row.workZone ? `Zone ${row.workZone.zone}` : '-'}</div>
                                            </div>
                                            <div className="job-list-detail-container">
                                                <div className="job-list-label">Status</div>
                                                <div className="job-list-detail">{row.status || '-'}</div>
                                            </div>
                                        </div>
                                        <div className="yellow-line" />
                                        <div className="job-list-row">
                                            <div className="job-list-detail-container">
                                                <div className="job-list-label">Notification</div>
                                                <div className="job-list-detail">{row.notifNumber || '-'}</div>
                                            </div>
                                            <div className="job-list-detail-container">
                                                <div className="job-list-label">Problem</div>
                                                <div className="job-list-detail">{row.specificObjectPart && row.specificObjectPart.objSpecificPartDesc} {row.damage && row.damage.damageDesc}</div>
                                            </div>
                                        </div>
                                        <div className="job-list-row">
                                            <div className="job-list-detail-container">
                                                <div className="job-list-label">Responsibility</div>
                                                <div className="job-list-detail">{row.responsibility ? row.responsibility.responsibilityDesc : '-'}</div>
                                            </div>
                                            <div className="job-list-detail-container">
                                                <div className="job-list-label">Aging</div>
                                                <div className="job-list-detail">{row.aging || '-'}</div>
                                            </div>
                                        </div>
                                        <div className="job-list-row">
                                            <div className="job-list-detail-container">
                                                <div className="job-list-label">Suggested Action</div>
                                                <div className="job-list-detail">{row.suggestedAction ? row.suggestedAction.actionDesc : '-'}</div>
                                            </div>
                                            <div className="job-list-detail-container">
                                                <div className="job-list-label">Priority</div>
                                                <div className="job-list-detail">{row.priority ? row.priority.priorityDesc : '-'}</div>
                                            </div>
                                        </div>
                                   </CardContent>
                               </Card>
                            )
                        })
                    }
                </div>
            )
        }
        return (
            <Table classes={{ root: 'table' }}>
                <TableHead className="table-head" classes={{ root: 'table-head' }}>
                    <TableRow classes={{ root: 'table-row' }}>
                        <TableCell align="left" className="table-cell">WORK ORDER</TableCell>
                        <TableCell align='left' className="table-cell">NOTIFICATION</TableCell>
                        <TableCell align="left" className="table-cell">AGING</TableCell>
                        <TableCell align="left" className="table-cell">PROBLEM</TableCell>
                        <TableCell align="left" className="table-cell">RESPONBILITY</TableCell>
                        <TableCell align="left" className="table-cell">WORK ZONE</TableCell>
                        <TableCell align="left" className="table-cell">SUGGESTED ACTION</TableCell>
                        <TableCell align="left" className="table-cell">PRIORITY</TableCell>
                        <TableCell align="left" className="table-cell">STATUS</TableCell>
                        {!this.props.backlogParameter.showBES && <TableCell align="left" className="table-cell"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody classes={{ root: 'table-body' }}>
                    {list.map((row, index) => (
                        <TableRow key={index} classes={{ root: "table-row" }} onClick={() => {this.props.onClickBesList(row.backlogId || '');}}>
                            <TableCell align="left" className="table-cell">{row.woNumber || '-'}</TableCell>
                            <TableCell align="left" className="table-cell">{row.notifNumber || '-'}</TableCell>
                            <TableCell align="left" className="table-cell">{row.aging || '-'}</TableCell>
                            <TableCell align="left" className="table-cell">{row.specificObjectPart && row.specificObjectPart.objSpecificPartDesc} {row.damage && row.damage.damageDesc}</TableCell>
                            <TableCell align="left" className="table-cell">{row.responsibility ? row.responsibility.responsibilityDesc : '-'}</TableCell>
                            <TableCell align="left" className="table-cell">{row.workZone ? `Zone ${row.workZone.zone}` : '-'}</TableCell>
                            <TableCell align="left" className="table-cell">{row.suggestedAction ? row.suggestedAction.actionDesc : '-'}</TableCell>
                            <TableCell align="left" className="table-cell">{row.priority ? row.priority.priorityDesc : '-'}</TableCell>
                            <TableCell align="left" className="table-cell">{row.status || '-'}</TableCell>
                            {!this.props.backlogParameter.showBES && <TableCell align="left" className="table-cell">{row.status && row.status.toLowerCase() === 'closed' && <img src={PencilYellow} alt='' className="edit-bms"/>}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }
}

export class BacklogEntrySheetList extends React.PureComponent<BacklogEntrySheetListProps> {
    handlePagination = (page: number) => { return this.props.updateBacklogParameter({ ...this.props.backlogParameter, currentPage: page }) }

    renderSearch() {
        return (
            <div className="search-input-container">
                <SearchInput webInfo='Search by unit code, unit model, or priority' {...this.props} onSearch={(filter) => this.props.updateBacklogParameter({...this.props.backlogParameter, filter})} />
            </div>
        )
    }

    renderPagination() {
        const web: boolean = this.props.displayMode === 'web' || !this.props.displayMode
        const next: boolean = this.props.backlogList.nextPage || false
        const prev: boolean = this.props.backlogList.prevPage || false
        const currentProps: number = this.props.backlogList.currentPage || 1
        const numberOfPage: number = this.props.backlogList.totalPage || 1

        return (
            <div className="pagination">
                <div className="paging">
                    {prev && <div onClick={() => this.handlePagination(currentProps - 1)} className="next-page"><KeyboardArrowLeft className="arrow-icon" /></div>}
                    {web && currentProps - 2 > 0 && <div onClick={() => this.handlePagination(currentProps - 2)} className="page-inactive">{currentProps - 2}</div>}
                    {currentProps - 1 > 0 && <div onClick={() => this.handlePagination(currentProps - 1)} className="page-inactive">{currentProps - 1}</div>}
                    <div onClick={() => this.handlePagination(currentProps)} className="page-active">{currentProps}</div>
                    {currentProps + 1 <= numberOfPage && <div onClick={() => this.handlePagination(currentProps + 1)} className="page-inactive">{currentProps + 1}</div>}
                    {web && currentProps + 2 <= numberOfPage && <div onClick={() => this.handlePagination(currentProps + 2)} className="page-inactive">{currentProps + 2}</div>}
                    {next && <div onClick={() => this.handlePagination(currentProps + 1)} className="next-page"><KeyboardArrowRight className="arrow-icon" /></div>}

                </div>
            </div>
        )

    }

    render() {
        return (
            <div className="bes-container">
                <div className="bes-header-container">
                    <div className="bes-header-line"></div>
                    <p>Backlog {this.props.backlogParameter.showBES ? 'Entry' : 'Monitoring'} Sheet</p>
                    {this.props.isExpanded && this.props.displayMode === 'web' && this.renderSearch()}
                </div>
                {this.props.isExpanded && this.props.displayMode !== 'web' && this.renderSearch()}
                <div className="table-container">
                    <BacklogEntrySheetTable {...this.props} />
                </div>
                {this.renderPagination()}
            </div>
        )
    }
}