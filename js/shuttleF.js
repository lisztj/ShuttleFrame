
        $(document).ready(function () {

            var setting = {
                view: {
                    nameIsHTML: true, //允许name支持html
                    // addHoverDom: addHoverDom,////增加
                    // removeHoverDom: removeHoverDom,////删除
                    selectedMulti: false
                },
                check: {////复选
                    enable: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                edit: {///编辑
                    enable: false
                },
                callback: {
                    // beforeMouseDown: beforeMouseDown,
                    // beforeMouseUp: beforeMouseUp,
                    // beforeRightClick: beforeRightClick,
                    onMouseDown: onMouseDown
                    // onMouseUp: onMouseUp,
                    // onRightClick: onRightClick
                }
            };

            var zNodes = [{
                id: 1,
                pId: 0,
                name: "[core] 基本功能 演示",
                open: true,
                tag: 11
            }, {
                id: 101,
                pId: 1,
                name: "最简单的树 --  标准 JSON 数据"
            }, {
                id: 102,
                pId: 1,
                name: "最简单的树 --  简单 JSON 数据"
            },
            {
                id: 2,
                pId: 0,
                name: "[excheck] 复/单选框功能 演示",
                open: false
            }, {
                id: 201,
                pId: 102,
                name: "Checkbox 勾选操作"
            }, {
                id: 206,
                pId: 102,
                name: "Checkbox nocheck 演示"
            }, {
                id: 207,
                pId: 102,
                name: "Checkbox chkDisabled 演示"
            }, {
                id: 208,
                pId: 2,
                name: "Checkbox halfCheck 演示"
            }, {
                id: 202,
                pId: 2,
                name: "Checkbox 勾选统计"
            }, {
                id: 203,
                pId: 2,
                name: "用 zTree 方法 勾选 Checkbox"
            }, {
                id: 204,
                pId: 2,
                name: "Radio 勾选操作"
            }, {
                id: 209,
                pId: 2,
                name: "Radio nocheck 演示"
            }, {
                id: 210,
                pId: 2,
                name: "Radio chkDisabled 演示"
            }, {
                id: 211,
                pId: 2,
                name: "Radio halfCheck 演示"
            }, {
                id: 205,
                pId: 2,
                name: "用 zTree 方法 勾选 Radio"
            }
            ];
            
            var zNodesR = [];
            // $(document).ready(function () {
            //     // $.fn.zTree.init($("#treeLeft"), setting, zNodes);
            //     console.log('初始化树');
            //     $.fn.zTree.init($("#treeRight"), setting, zNodesR);
            // });
            ///初始化树
            setTimeout(function() {
                $.fn.zTree.init($("#treeLeft"), setting, zNodes);
                fuzzySearch('treeLeft', '#key', false, true); //初始化模糊搜索方法
                // $(".zx_treeD").append('<ul id="treeLeft" class="ztree"></ul>');
            },500);
            var newCount = 1;
            ///点击选择事件
            function onMouseDown(event, treeId, treeNode) {
                // showLog("[ " + getTime() + " onMouseDown ]&nbsp;&nbsp;" + (treeNode ? treeNode.name : "root"), "down");
                console.log('treeClick', treeNode);
                
                if (!treeNode){
                    return;
                }else{
                    if (treeNode.pId == 1) {
                        // ztreeD = ztreeD;
                        return;
                    } else if (treeNode.pId == 102) {
                        ztreeD = ztreeD2;
                        
                    } else if (treeNode.pId == 2) {
                        ztreeD = ztreeD3;
                        
                    }
                }
                
            }
            function addHoverDom(treeId, treeNode) {///添加树
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
                var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
                    "' title='add node' onfocus='this.blur();'></span>";
                sObj.after(addStr);
                var btn = $("#addBtn_" + treeNode.tId);
                if (btn) btn.bind("click", function () {
                    var zTree = $.fn.zTree.getZTreeObj("treeLeft");
                    var zTreeRight = $.fn.zTree.getZTreeObj("treeRight");
                    zTree.addNodes(treeNode, {
                        id: (100 + newCount),
                        pId: treeNode.id,
                        name: "new node" + (newCount++)
                    });
                    zTreeRight.addNodes(treeNode, {
                        id: (100 + newCount),
                        pId: treeNode.id,
                        name: "new node" + (newCount++)
                    });
                    return false;
                });
            };

            function removeHoverDom(treeId, treeNode) {///删除树
                $("#addBtn_" + treeNode.tId).unbind().remove();
            };

            var ztreeD = [{
                roleId: 1,
                // pId: 0,
                roleName: "[core] 基本功能 演示",
                // open: true,
                // tag: 11
            }, {
                roleId: 101,
                // pId: 1,
                roleName: "最简单的树 --  标准 JSON 数据"
            }, {
                roleId: 102,
                // pId: 1,
                roleName: "最简单的树 --  简单 JSON 数据"
            }, {
                roleId: 103,
                // pId: 1,
                roleName: "不显示 连接线"
            }, {
                roleId: 104,
                // pId: 1,
                roleName: "不显示 节点 图标"
            }, {
                roleId: 108,
                // pId: 1,
                roleName: "异步加载 节点数据"
            }];

            var ztreeD2 = [ {
                roleId: 109,
                // pId: 1,
                roleName: "用 zTree 方法 异步加载 节点数据"
            }, {
                roleId: 110,
                // pId: 1,
                roleName: "用 zTree 方法 更新 节点数据"
            }, {
                roleId: 111,
                // pId: 1,
                roleName: "单击 节点 控制"
            }, {
                roleId: 112,
                // pId: 1,
                roleName: "展开 / 折叠 父节点 控制"
            }, {
                roleId: 113,
                // pId: 1,
                roleName: "根据 参数 查找 节点"
            }, {
                roleId: 114,
                // pId: 1,
                roleName: "其他 鼠标 事件监听"
            }];

            var ztreeD3 = [
            {
                roleId: 3,
                // pId: 0,
                roleName: "[exedit] 编辑功能 演示",
                // open: false
            }, {
                roleId: 301,
                // pId: 3,
                roleName: "拖拽 节点 基本控制"
            }, {
                roleId: 302,
                // pId: 3,
                roleName: "拖拽 节点 高级控制"
            }];
            
            /*初始化duallistbox*/
            //queryParam1：参数
            //selectClass：select元素class属性
            //selectedDataStr：选中数据，多个以,隔开
            function initListBox(queryParam1, selectClass, selectedDataStr) {
                var paramData = {
                    'testParam1': queryParam1
                }
                $.ajax({
                    url: 'DataHandler.ashx',
                    type: 'get',
                    data: paramData,
                    async: true,
                    success: function (returnData) {
                        var objs = $.parseJSON(returnData);
                        $(objs).each(function () {
                            var o = document.createElement("option");
                            o.value = this['id'];
                            o.text = this['name'];
                            if ("undefined" != typeof (selectedDataStr) && selectedDataStr != "") {
                                var selectedDataArray = selectedDataStr.split(',');
                                $.each(selectedDataArray, function (i, val) {
                                    if (o.value == val) {
                                        o.selected = 'selected';
                                        return false;
                                    }
                                });
                            }
                            $("." + selectClass + "")[0].options.add(o);
                        });
                        //渲染dualListbox
                        $('.' + selectClass + '').bootstrapDualListbox({
                            nonSelectedListLabel: 'Non-selected',
                            selectedListLabel: 'Selected',
                            preserveSelectionOnMove: 'moved',
                            moveOnSelect: false//,
                            //nonSelectedFilter: 'ion ([7-9]|[1][0-2])'
                        });
                    },
                    error: function (e) {
                        alert(e.msg);
                    }
                });
            }
            ///穿梭框初始化
            var zxChuans = $('.zxTreea').doublebox({
                nonSelectedListLabel: '源列表',
                selectedListLabel: '目标列表',
                preserveSelectionOnMove: 'moved',
                moveOnSelect: false,
                nonSelectedList: ztreeD
                // [{ "roleId": "1", "roleName": "zhangsan" }, { "roleId": "2", "roleName": "lisi" }, { "roleId": "3", "roleName": "wangwu" }]
                ,
                selectedList: []
                // [{ "roleId": "4", "roleName": "zhangsan1" }, { "roleId": "5", "roleName": "lisi1" }, { "roleId": "6", "roleName": "wangwu1" }]
                ,
                optionValue: "roleId",
                optionText: "roleName",
                doubleMove: true,
            });
            
        });