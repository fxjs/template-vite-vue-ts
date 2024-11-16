import { useState } from '@/common/hooks/useState.ts';
import { IDict, IObj } from '@/types';
import { trimLastEmptyChild } from '@/utils/tree.ts';
import { $dict } from '@/views/common/dict/dict.ts';
import { comGetDeptTree } from '@/views/common/response';

export const dictHooks = {
  // 状态字典
  useStatusList(valueList: Array<string | number> = ['', '0', '1']) {
    const statusList = [
      { label: '全部', value: valueList[0] },
      { label: '启用', value: valueList[1] },
      { label: '停用', value: valueList[2] },
    ];
    return { statusList };
  },
  // 部门树
  useDeptTree() {
    const [deptTree, setDeptTree] = useState<IObj<any>[]>([]);
    comGetDeptTree().then(({ data }) => {
      setDeptTree(trimLastEmptyChild(data, 'childDeptList') || []);
    });
    return { deptTree };
  },
  // 行政区划
  useXzqh() {
    const [xzqhOpt, setXzqhOpt] = useState<IDict[]>([]);
    $dict.getDictDataTree('xzqh').then(({ data }) => {
      setXzqhOpt(trimLastEmptyChild(data, 'childDictDataList') || []);
    });
    return { xzqhOpt };
  },
  // 检查情况
  useInspectStatus() {
    const [opt, setOpt] = useState<IDict[]>([]);
    $dict.getSysDictByType('inspectStatus').then(({ data }) => {
      setOpt(data || []);
    });
    return { inspectStatusOpt: opt };
  },
  // 检查结果
  useInspectResult() {
    const [opt, setOpt] = useState<IDict[]>([]);
    $dict.getSysDictByType('inspectResult').then(({ data }) => {
      setOpt(data || []);
    });
    return { inspectResultOpt: opt };
  },
};
