
$(document).ready(function () {
    ///ztree设置
    var setting = {
        view: {
            nameIsHTML: true, //允许name支持html
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
            onMouseDown: onMouseDown
        }
    };
    ////树数据
    var zNodes = [
        {
            id: 1,
            pId: 0,
            name: "镇江新创计算机系统集成有限公司",
            open: true,
            tag: 11
        }, {
            id: 101,
            pId: 1,
            name: "总经办"
        }, {
            id: 102,
            pId: 0,
            name: "管理中心"
        },
        {
            id: 2,
            pId: 0,
            name: "财务部",
            open: false
        }, {
            id: 201,
            pId: 2,
            name: "人事部"
        }, {
            id: 206,
            pId: 2,
            name: "行政部"
        }, {
            id: 207,
            pId: 102,
            name: "信息部"
        }, {
            id: 208,
            pId: 2,
            name: "法务部"
        }, {
            id: 202,
            pId: 2,
            name: "开发部"
        }, {
            id: 203,
            pId: 2,
            name: "工程部"
        }, {
            id: 204,
            pId: 2,
            name: "人员"
        }, {
            id: 209,
            pId: 2,
            name: "企划"
        }, {
            id: 210,
            pId: 2,
            name: "演示"
        }, {
            id: 211,
            pId: 2,
            name: "测试"
        }, {
            id: 205,
            pId: 2,
            name: "勾选"
        }
    ];
    /////服务器读取数据
    // $.getJSON("../treeData.json", function (data) {
    //     console.log(data);
    //     // zNodes = data;
    // })
    ////左侧穿梭框数据
    var ztreeD = [{
        roleId: 1,
        // pId: 0,
        roleName: "张宇",
        // open: true,
        // tag: 11
    }, {
        roleId: 101,
        // pId: 1,
        roleName: "吴疆"
    }, {
        roleId: 102,
        // pId: 1,
        roleName: "刘德华"
    }, {
        roleId: 103,
        // pId: 1,
        roleName: "周润发"
    }, {
        roleId: 104,
        // pId: 1,
        roleName: "张学友"
    }, {
        roleId: 108,
        // pId: 1,
        roleName: "黎明"
    }];
    ////左侧穿梭框数据
    var ztreeD2 = [{
        roleId: 109,
        // pId: 1,
        roleName: "小虎队"
    }, {
        roleId: 110,
        // pId: 1,
        roleName: "王志鹏"
    }, {
        roleId: 111,
        // pId: 1,
        roleName: "吴奇隆"
    }, {
        roleId: 112,
        // pId: 1,
        roleName: "苏有朋"
    }, {
        roleId: 113,
        // pId: 1,
        roleName: "其他"
    }, {
        roleId: 114,
        // pId: 1,
        roleName: "欧汉神"
    }];
    ////左侧穿梭框数据
    var ztreeD3 = [
        {
            roleId: 3,
            // pId: 0,
            roleName: "冯小刚",
            // open: false
        }, {
            roleId: 301,
            // pId: 3,
            roleName: "陈可辛"
        }, {
            roleId: 302,
            // pId: 3,
            roleName: "徐峥"
        }];

    // var zNodesR = [];
    ///初始化树
    setTimeout(function () {
        if (zNodes) {
            $.fn.zTree.init($("#treeLeft"), setting, zNodes);
        }

        fuzzySearch('treeLeft', '#key', false, true); //初始化模糊搜索方法
    }, 500);
    var newCount = 1;
    ///点击选择事件
    function onMouseDown(event, treeId, treeNode) {
        
        if (!treeNode) {//判断树是否为空
            return;
        } else {
            if (treeNode.pId == 1) {
                // console.log($("#bootstrap-duallistbox-selected-list_doublebox")[0].selectedOptions);
                optionsG(ztreeD);
              
                return;
            } else if (treeNode.pId == 102) {
                
                optionsG(ztreeD2);
               
            } else if (treeNode.pId == 2) {
               
                optionsG(ztreeD3);
               
            }
            console.log('treeClick', treeNode);
        }

    }
    ///数据格式化成options
    function optionsG(params) {
        var scleteD = $("#bootstrap-duallistbox-selected-list_doublebox")[0].selectedOptions;
        console.log(makeArray(scleteD));
        var seclectData = makeArray(scleteD);
        seclectData.forEach(function(item) {
            console.log(item.value);
        });
        if (seclectData.lengh!=0){
            ////清空左侧穿梭框数据
            $("#bootstrap-duallistbox-nonselected-list_doublebox").empty();
        }
        setTimeout(function() {
            params.forEach(function (element) {
                var o = document.createElement("option")
                o.value = element.roleId;
                o.text = element.roleName;
                if ("undefined" != typeof (selectedDataStr) && selectedDataStr != "") {
                    var selectedDataArray = selectedDataStr.split(',');
                    $.each(selectedDataArray, function (i, val) {
                        if (o.value = val) {
                            o.selected = "selected";
                            return false;
                        }
                    });
                }
                // $("select[multiple*='multiple']")[0].options.add(o);
                $("#bootstrap-duallistbox-nonselected-list_doublebox").append(o);
            });
        }, 200);
       
    };
    /////将HTMLCollection/NodeList/伪数组转换成数组
    var makeArray = function (obj) {
        return Array.prototype.slice.call(obj, 0);
    }
    //以下的代码只是兼容IE等老浏览器的东东
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
    } catch (e) {
        makeArray = function (obj) {
            var res = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                res.push(obj[i]);
            }
            return res;
        };
    };
    
    $(function () {
        //选项卡切换
        $('.zx_category ul li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
           var indexC = $(this).index();
            console.log(indexC);
            // zxChuans.doublebox('refresh', true);
            // console.log(zxChuans.doublebox('getSelectedOptions'));
            ////清空左侧穿梭框数据
            // $("#bootstrap-duallistbox-nonselected-list_doublebox").empty();
            if (indexC==0){
                return;
            } else if (indexC == 1){
                ztreeD = ztreeD2;
            } else if (indexC == 2) {
                ztreeD = ztreeD3;
            } else if (indexC == 3) {
                return;
            } else if (indexC == 4) {
                return;
            } 
            
            // $('.cont').eq(indexC).addClass('active').siblings().removeClass('active');
        });
    });

    ///穿梭框初始化
    var zxChuans = $('.zxTreea').doublebox({
        nonSelectedListLabel: '源列表',
        selectedListLabel: '目标列表',
        preserveSelectionOnMove: 'moved',
        moveOnSelect: false,
        nonSelectedList: ztreeD,
        selectedList: [],
        optionValue: "roleId",
        optionText: "roleName",
        doubleMove: true,
    });
});

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