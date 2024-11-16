export default {
  demo: {
    login: '/auth/login', // 系统登录
    logout: '/auth/logout', // 退出登录
    uploadfile: '/file/uploadfile', // 文件上传
    queryDictDataByType: '/dict/queryDictDataByType', // 字典
    getDictDataTree: '/dict/getDictDataTree', // 字典树
    deptTree: '/dept/v1/deptTree', // 部门树

    /* demo模块 */
    queryInspectPageList: '/demo/v1/queryPageList', // 分页
    queryInspectInfoById: '/demo/v1/queryInspectInfoById', // 详情
    saveAndUpdateInspect: '/demo/v1/saveAndUpdate', // 保存/新增
    deleteInspectInfoById: '/demo/v1/deleteInspectInfoById', // 删除
    placeInspectImport: '/demo/v1/import', // 导入
    placeInspectExport: '/demo/v1/export', // 导出
  },
};
