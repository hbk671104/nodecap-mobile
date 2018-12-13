import request from '../utils/request';
import Config from '../runtime';
import R from 'ramda';

/**
 * 登录
 * @param account
 * @param password
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function login({ account, password }) {
  return request.post('/users/access-token', {
    account,
    password,
  });
}

/**
 * 设置密码
 * @param password_reset_token
 * @param confirm_password
 * @param password
 * @returns {AxiosPromise<any>}
 */
export function setPassword({
  password_reset_token,
  confirm_password,
  password,
}) {
  return request.post(`${Config.API_URL}/users/reset-password`, {
    password_reset_token,
    confirm_password,
    password,
  });
}

export function getCurrent() {}

/**
 * 项目列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function projectIndex(params = {}) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/projects?expand=white_papers,post_user,invest_token', {
    params: paramsTransform(params),
  });
}

/**
 * 项目详情
 * @param id
 * @returns {AxiosPromise<any>}
 */
export function projectDetail({ id }) {
  return request.get(`/projects/${id}`);
}

/**
 * 更新详情
 * @param id
 * @returns {AxiosPromise<any>}
 */
export function updateProjectDetail({ id, payload }) {
  return request.put(`/projects/${id}`, payload);
}

/**
 * 站点配置
 * @returns {AxiosPromise<any>}
 */
export function getConstants() {
  // request.get('/constants').then(console.log)
  return request.get('/constants');
}

/**
 * 创建项目
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function createProject(params) {
  return request.post('/projects', params);
}

/**
 * 编辑项目
 * @param id
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function editProject(id, params) {
  return request.put(`/projects/${id}`, params);
}

/**
 * 获得上传文件的 token
 * @param type
 * @returns {AxiosPromise<any>}
 */
export function getUploadToken(type) {
  return request.get(`/users/uptoken?dir=${type}`);
}

/**
 * 当前用户
 * @returns {AxiosPromise<any>}
 */
export function getUser() {
  return request.get('/user');
}

/**
 * 根据用户 ID 获取用户详情
 * @returns {AxiosPromise<any>}
 */
export function getUserById(id) {
  return request.get(`/users/${id}`);
}

/**
 * 更新指定用户资料
 * @returns {AxiosPromise<any>}
 */
export function updateUserById(data) {
  return request.put(`/users/${data.id}`, data);
}

/**
 * 标签库
 */
export function getProjectTags() {
  return request.get('/project-tags');
}

/**
 * 删除标签
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteProjectTags(id) {
  return request.delete(`/project-tags/${id}`);
}

/**
 * 添加标签
 * @param id
 * @returns {AxiosPromise}
 */
export function addProjectTags(payload) {
  return request.post('/project-tags', payload);
}

/**
 * 项目 Token 融资信息
 * @param projectId
 * @returns {AxiosPromise<any>}
 */
export function getProjectFinanceToken(projectId) {
  return request.get(
    `/projects/${projectId}/finance-tokens?expand=items,tokens`,
  );
}

/**
 * 项目股权融资信息
 * @param projectId
 * @returns {AxiosPromise<any>}
 */
export function getProjectFinanceEquities(projectId) {
  return request.get(
    `/projects/${projectId}/finance-equities?expand=tokens,items`,
  );
}

/**
 * 项目 Token 投资记录
 */
export function getProjectInvestTokens(projectId) {
  return request.get(`/projects/${projectId}/invest-tokens?expand=tokens`);
}

/**
 * 项目股权投资记录
 */
export function getProjectInvestEquities(projectId) {
  return request.get(`/projects/${projectId}/invest-equities?expand=tokens`);
}

/**
 * 项目回币记录
 * @param projectId
 * @returns {AxiosPromise<any>}
 */
export function getProjectReturnTokens(projectId) {
  return request.get(`/projects/${projectId}/return-tokens`);
}

/**
 * 创建项目成员
 * @param projectId
 * @param member
 * @returns {AxiosPromise<any>}
 */
export function createProjectMembers({ projectId, member }) {
  return request.post(`/projects/${projectId}/members`, member);
}

/**
 * 更新项目成员
 * @param projectId
 * @param member
 * @returns {AxiosPromise<any>}
 */
export function updateProjectMembers({ memberId, member }) {
  return request.put(`/project-members/${memberId}`, member);
}

/**
 * 创建募资详情
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function createProjectFinanceInfo({ projectId, financeInfo, type }) {
  return request.post(
    `/projects/${projectId}/finance-${type}?expand=tokens,items`,
    financeInfo,
  );
}

/**
 * 更新募资详情
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function updateProjectFinanceInfo({ id, financeInfo, type }) {
  return request.put(`/finance-${type}/${id}?expand=tokens,items`, financeInfo);
}

/**
 * 删除募资详情
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function deleteProjectFinanceInfo({ id, type }) {
  return request.delete(`/finance-${type}/${id}`);
}

/**
 * 创建投资记录
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function createProjectInvestInfo({ projectId, financeInfo, type }) {
  return request.post(`/projects/${projectId}/invest-${type}`, financeInfo);
}

/**
 * 更新投资记录
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function updateProjectInvestInfo({ id, financeInfo, type }) {
  return request.put(`/invest-${type}/${id}`, financeInfo);
}

/**
 * 删除投资记录
 * @param projectId
 * @param financeInfo
 * @returns {AxiosPromise<any>}
 */
export function deleteProjectInvestInfo({ id, type }) {
  return request.delete(`/invest-${type}/${id}`);
}

/**
 * 创建回币信息
 * @param projectId
 * @param returnToken
 * @returns {AxiosPromise<any>}
 */
export function createProjectReturnToken({ projectId, returnToken }) {
  return request.post(`/projects/${projectId}/return-tokens`, returnToken);
}

/**
 * 更新回币信息
 * @param projectId
 * @param returnToken
 * @returns {AxiosPromise<any>}
 */
export function updateProjectReturnToken({ id, returnToken }) {
  return request.put(`/return-tokens/${id}`, returnToken);
}

/**
 * 删除回币信息
 * @param projectId
 * @param returnToken
 * @returns {AxiosPromise<any>}
 */
export function deleteProjectReturnToken({ id }) {
  return request.delete(`/return-tokens/${id}`);
}

/**
 * 投资库列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function portfolioIndex(params = {}) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/projects?expand=white_papers,post_user,invest_token', {
    params: paramsTransform(params),
  });
}

/**
 * 投资库可计算收益列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function investmentIndex(params = {}) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/projects/invested', {
    params: paramsTransform(params),
  });
}

/**
 * 资源库列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function resourceIndex(params = {}) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
    type: params.type === '0' ? undefined : params.type,
  });
  return request.get('/resources', {
    params: paramsTransform(params),
  });
}

/**
 * 资源库详情
 * @param id
 * @returns {AxiosPromise<any>}
 */
export function resourceDetail({ id }) {
  return request.get(`/resources/${id}`);
}

/**
 * 创建资源库项目
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function createResource(params) {
  return request.post('/resources', params);
}

/**
 * 编辑资源库项目
 * @param id
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function editResource(id, params) {
  return request.put(`/resources/${id}`, params);
}

/**
 * 删除资源库项目
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteResource(id) {
  return request.delete(`/resources/${id}`);
}

/**
 * 用户列表
 * @returns {AxiosPromise<any>}
 */
export function getUsers(req) {
  const paramsTransform = p => ({
    ...req,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/users', {
    params: paramsTransform(req),
  });
}

/**
 * 创建用户
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function createUser(payload) {
  return request.post('/users', payload);
}

/**
 * 更新用户资料
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function updateUserProfile(payload) {
  return request.put('/user', payload);
}

/**
 * 修改用户密码
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function updateUserPassword(payload) {
  return request.post('/user/update-password', payload);
}

/**
 * 删除用户
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteUserById(id) {
  return request.delete(`/users/${id}`);
}

/**
 * 获取全部角色
 * @returns {AxiosPromise<any>}
 */
export function getAllRoles() {
  return request.get('/rbac/roles');
}

/**
 * 创建角色
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function createRole(payload) {
  return request.post('/rbac/roles', payload);
}

/**
 * 更新角色
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function updateRole(payload) {
  return request.put(`/rbac/roles/${payload.id}`, payload);
}

/**
 * 获取全部权限
 * @returns {AxiosPromise<any>}
 */
export function getAllPermissions() {
  return request.get('/rbac/permissions');
}

/**
 * 基金列表
 * @returns {AxiosPromise<any>}
 */
export function getFunds() {
  return request.get('/funds');
}

/**
 * 项目方提交项目
 * @param project
 * @returns {AxiosPromise<any>}
 */
export function createExternalProject(project) {
  return request.post('/external-projects', project);
}

/**
 * 项目方提交项目
 * @param project
 * @returns {AxiosPromise<any>}
 */
export function createExternalProjectMembers({ projectId, member }) {
  return request.post(`external-projects/${projectId}/members`, member);
}

/**
 * 项目方提交募集信息
 * @param id
 * @param financing
 * @returns {AxiosPromise<any>}
 */
export function createExternalFinancing({ id, financing, type }) {
  return request.post(`external-projects/${id}/finance-${type}`, financing);
}

/**
 * 获取退出记录
 * @param projectId
 * @returns {AxiosPromise<any>}
 */
export function getExitToken(projectId) {
  return request.get(`/projects/${projectId}/exit-tokens`);
}

/**
 * 创建退出记录
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function createProjectExitToken(payload) {
  return request.post(`/projects/${payload.projectId}/exit-tokens`, payload);
}

/**
 * 更新退出记录
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function updateProjectExitToken(payload) {
  return request.put(`/exit-tokens/${payload.id}`, payload);
}

/**
 * 删除退出记录
 * @param payload
 * @returns {AxiosPromise<any>}
 */
export function deleteProjectExitToken(payload) {
  return request.delete(`/exit-tokens/${payload.id}`);
}

export function getDashboardData(id) {
  return request.get(`/statistic?fid=${id}`);
}

export function getProjectChartData({ id, payload }) {
  return request.get(`/projects/${id}/statistic`, {
    params: payload,
  });
}

export function getProjectSymbol(id) {
  return request.get(`/projects/${id}/symbols`, {
    params: {
      all: 1,
    },
  });
}

export function getMatchedCoin(payload) {
  return request.get('/coins/matched', {
    params: payload,
  });
}

export function modifyCompany(params) {
  return request.put('/company', params);
}

export function holdingReport(fid) {
  return request.get(`/funds/${fid}/position-report`);
}

export function investmentReport(fid) {
  return request.get(`/funds/${fid}/investment-report`);
}

export function generalReport(fid) {
  return request.get(`/funds/${fid}/general-report`);
}

export function trendList(payload) {
  const paramsTransform = p => ({
    ...payload,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/user-notifys/news', {
    params: paramsTransform(payload),
  });
}

export function trendDetail(id) {
  return request.get(`/news/${id}/news-info`);
}

export function projectRecommendation() {
  return request.get('/coins/recommended');
}

export function updateRecommendation(payload) {
  return request.post('/coins/recommended', payload);
}

export function getProjectFundStat(id) {
  return request.get(`/projects/${id}/funds-statistic`);
}

export function getCoinFinanceInfo(cid) {
  return request.get(`/coins/${cid}/finance-info`);
}

export function getCoinInfo(cid) {
  return request.get(`/coins/${cid}`);
}

export function addToWorkflow(payload) {
  return request.post('/coins/public', payload);
}

/**
 * 注册验证码
 * @param mobile
 * @returns {AxiosPromise<any>}
 */
export function getSMSCode(mobile) {
  return request.post('/signup/code', { mobile });
}
/**
 * 注册验证码
 * @param mobile
 * @returns {AxiosPromise<any>}
 */
export function getLoginSMSCode(mobile) {
  return request.post('/login/code', { mobile });
}

/**
 * 创建公司
 * @param data
 */
export function createCompany(data) {
  return request.post('/signup', data);
}

export function getNewsByCoinId(id) {
  return request.get(`/coins/${id}/news-info`);
}

/**
 * 评级机构列表
 * @returns {AxiosPromise<any>}
 */
export function getIndustries(params) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/industry-investments', {
    params: paramsTransform(params),
  });
}
/**
 * 评级机构列表
 * @returns {AxiosPromise<any>}
 */
export function getPublicProjects(params) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/coins/public', {
    params: paramsTransform(params),
  });
}
/**
 * 评级机构列表
 * @returns {AxiosPromise<any>}
 */
export function getReportsByIndustry(params = {}) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/industries/items', {
    params: paramsTransform(params),
  });
}

export function getLiveList(lastId) {
  return request.get('http://api.coindog.com/live/list', {
    params: {
      limit: 25,
      ...(lastId
        ? {
            id: lastId,
            flag: 'down',
          }
        : {}),
    },
  });
}

export function getInvestNews(params = {}) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/invest-news/index', {
    params: paramsTransform(params),
  });
}

export function getCoinSymbol(coin_id) {
  return request.get(`/coins/${coin_id}/symbols`);
}

export function meetingList(params) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/activities', { params: paramsTransform(params) });
}

export function getIndustryDetail(id) {
  return request.get(`/industry-investments/${id}`);
}

export function getCoinSets() {
  return request.get('/coin-sets');
}

export function getCoinsBySetID(set_id, params = {}) {
  return request.get(`/coin-sets/${set_id}/coins`, {
    params,
  });
}

export function getCoinTags(params) {
  const paramsTransform = p => ({
    ...params,
    page: p.currentPage,
    'per-page': p.pageSize,
  });
  return request.get('/coin-tags', {
    params: paramsTransform(params),
  });
}

/**
 * 评级机构列表
 * @returns {AxiosPromise<any>}
 */
export function getInstitution(params) {
  return request.get('/industry-investments', {
    params,
  });
}

export function getInstitutionDetail(id) {
  return request.get(`/industry-investments/${id}`);
}

export function getInstitutionBanner() {
  return request.get('/report-sets');
}

export function getInstitutionReportSet(params) {
  return request.get('/reports', {
    params,
  });
}

export function getInstitutionReportByID(id) {
  return request.get(`/reports/${id}`);
}

export function viewReport(id) {
  return request.put(`/reports/${id}/views`);
}

export function viewInstitution(id) {
  return request.put(`/industry-investments/${id}/views`);
}

export function getBanners() {
  return request.get('/banner');
}

export function getLatestNews(payload = {}) {
  const paramsTransform = p => ({
    ...payload,
    page: p.currentPage,
    'per-page': p.pageSize,
    type: 4,
  });
  return request.get('/news', {
    params: paramsTransform(payload),
  });
}

export function getDappTypes() {
  return request.get('/dapp/topic');
}

export function getDappDetail(id) {
  return request.get(`/dapp/${id}`);
}

export function getDappList(payload = {}) {
  const paramsTransform = p => ({
    ...payload,
    page: p.currentPage,
    'per-page': p.pageSize,
    type: 4,
  });
  return request.get('/dapp', {
    params: paramsTransform(payload),
  });
}

