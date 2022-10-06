import React from 'react'
import Dashboard from '../pages/dashboard/Dashboard';
import { Route, Switch } from 'react-router'
import { LoginPage } from '../pages/login';
import { JobsPage } from '../pages/jobs-execution/jobs';
import { BacklogMonitoring } from '../pages/backlog-monitoring';
import { Menu } from '../common/constants';
import { FcMonitoring } from '../pages/fc-monitoring';
import { Settings } from '../pages/settings';
import { MasterDataUploader } from '../pages/master-data-uploader';
import { JobsReport } from '../pages/jobs-execution/jobs-report';
import { requireAuth } from '../components/auth-guard-hoc';
import { PiDetailPage } from '../pages/pi-detail/';

const routes = (
  <div>
    <Switch>
      <Route exact path={Menu.LOGIN} component={LoginPage} />
      <Route exact path={Menu.DASHBOARD} component={requireAuth(Dashboard)} />
      <Route exact path={Menu.JOBS_SUMMARY} component={requireAuth(JobsPage)} />
      <Route exact path={Menu.JOBS_REPORT} component={requireAuth(JobsReport)} />
      <Route exact path={Menu.BACKLOG} component={requireAuth(BacklogMonitoring)} />
      <Route exact path={Menu.FC} component={requireAuth(FcMonitoring)} />
      <Route exact path={Menu.MASTER_DATA} component={requireAuth(MasterDataUploader)} />
      <Route exact path={Menu.SETTINGS} component={requireAuth(Settings)} />
      <Route exact path={`${Menu.DETAIL_PI}:wo`} component={requireAuth(PiDetailPage)} />
      <Route exact path='*' component={requireAuth(Dashboard)} />
    </Switch>
  </div>
)

export default routes;