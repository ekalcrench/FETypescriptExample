import React from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent } from '@material-ui/core';
import { ExpandMore, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { SearchInput } from '../../../../components/search-input/SearchInput';
import { JobListProps } from './JobList.model';
import './JobList.scss';

export class JobList extends React.PureComponent<JobListProps> {

    handlePagination = (page: number) => { return this.props.updateBacklogParameter({...this.props.backlogParameter, currentPage: page})}

    renderList() {
        if (this.props.displayMode === "mobile") {
            return (
                <div>
                    {
                        this.props.backlogList.listBacklog && this.props.backlogList.listBacklog.map((row, index) => {
                            return (
                               <Card key={index} onClick={() => this.props.onClick(row.backlogId || '')} className="backlog-job-list-mobile-card">
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
        return(
            <div className="table-container">
                <Table classes={{root: 'table'}}>
                    <TableHead className="table-head" classes={{root: 'table-head'}}>
                        <TableRow classes={{root: 'table-row'}}>
                            <TableCell style={{padding: '0.5vw'}}></TableCell>
                            <TableCell align="left" className="table-cell">WORK ORDER</TableCell>
                            <TableCell align="left" className="table-cell">AGING</TableCell>
                            <TableCell align="left" className="table-cell">PROBLEM</TableCell>
                            <TableCell align="left" className="table-cell">RESPONSIBILITY</TableCell>
                            <TableCell align="left" className="table-cell">WORK ZONE</TableCell>
                            <TableCell align="left" className="table-cell">SUGGESTED ACTION</TableCell>
                            <TableCell align="left" className="table-cell">PRIORITY</TableCell>
                            <TableCell align="left" className="table-cell">STATUS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody classes={{root: 'table-body'}}>
                        {
                            this.props.backlogList.listBacklog && this.props.backlogList.listBacklog.map((row, index) => {
                                return (
                                    <TableRow onClick={() => this.props.onClick(row.backlogId || '')} key={index} classes={{root: "table-row"}}>
                                        <TableCell style={{padding: '0.5vw'}}></TableCell>
                                        <TableCell align="left" className="table-cell">{row.woNumber || '-'}</TableCell>
                                        <TableCell align="left" className="table-cell">{row.aging || '-'}</TableCell>
                                        <TableCell align="left" className="table-cell">{row.specificObjectPart && row.specificObjectPart.objSpecificPartDesc} {row.damage && row.damage.damageDesc}</TableCell>
                                        <TableCell align="left" className="table-cell">{row.responsibility ? row.responsibility.responsibilityDesc : '-'}</TableCell>
                                        <TableCell align="left" className="table-cell">{row.workZone ? `Zone ${row.workZone.zone}` : '-'}</TableCell>
                                        <TableCell align="left" className="table-cell">{row.suggestedAction ? row.suggestedAction.actionDesc : '-'}</TableCell>
                                        <TableCell align="left" className="table-cell">{row.priority ? row.priority.priorityDesc : '-'}</TableCell>
                                        <TableCell align="left" className="table-cell">{row.status || '-'}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>                            
            </div>      
        )
    }

    renderPagination() {
        const web: boolean = this.props.displayMode === 'web'
        const next: boolean = this.props.backlogList.nextPage || false
        const prev: boolean = this.props.backlogList.prevPage || false
        const currentProps: number = this.props.backlogList.currentPage || 1
        const numberOfPage: number = this.props.backlogList.totalPage || 1

        return(                     
            <div className="pagination">
                <div className="paging">
                    {prev && <div onClick={() => this.handlePagination(currentProps - 1)} className="next-page"><KeyboardArrowLeft className="arrow-icon"/></div>} 
                    {web && currentProps - 2 > 0 && <div onClick={() => this.handlePagination(currentProps - 2)} className="page-inactive">{currentProps - 2}</div>}
                    {currentProps - 1 > 0 && <div onClick={() => this.handlePagination(currentProps - 1)} className="page-inactive">{currentProps - 1}</div>}
                    <div onClick={() => this.handlePagination(currentProps)} className="page-active">{currentProps}</div>
                    {currentProps + 1 <= numberOfPage && <div onClick={() => this.handlePagination(currentProps + 1)} className="page-inactive">{currentProps + 1}</div>}
                    {web && currentProps + 2 <= numberOfPage && <div onClick={() => this.handlePagination(currentProps + 2)} className="page-inactive">{currentProps + 2}</div>}
                    {next && <div onClick={() => this.handlePagination(currentProps + 1)} className="next-page"><KeyboardArrowRight className="arrow-icon"/></div>}

                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="job-list-container">
                <ExpansionPanel defaultExpanded classes={{root: 'job-list-expand'}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore className="expand-icon"/>} 
                        classes={{expanded: 'job-list-header-icon', 
                                root: 'job-list-header-expanded', 
                                content: 'job-list-header-expanded'}} >
                        <p className="job-list-title">Job List</p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails classes={{root:'job-list-detail'}}>
                        <div className="buttons-row">
                            <div className="btn-active">Backlog</div>
                            <div className="btn-inactive">PCAR</div>
                            <div className="btn-inactive">MA</div>
                            {
                                this.props.displayMode !== 'mobile' &&
                                <div className="search-input-container">
                                    <SearchInput {...this.props} webInfo='Search by unit code, unit model or priority' onSearch={(text) => this.props.updateBacklogParameter({...this.props.backlogParameter, filter: text})} />
                                </div>
                            }
                        </div>
                        {this.renderList()} 
                        {this.renderPagination()}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

