/**
 * 全局数据
 * data.js
 */

// 请求地址汇总
let baseUrl = "http://www.mamawozaizhe.com/mobile2/wenzhang/"
let baseDetUrl = "http://www.mamawozaizhe.com/mobile2/wenzhang/"
let baseMock = "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/"
let urlObj = {
    // 分类地址
    fenleiUrl: "cateAjax",
    // 删除文章
    deletUrl: "deleteAjax",
    // 提交新的文章
    submitUrl: "fabuAjax",
    // 提交文章评论
    subComment: "comAjax",
    // 审核评论
    shenheCom: "comStatusAjax",
};



// 缓存器
let cachData = {};

/****************************************************************************************************************** */
/**
 * 点击
 * click.js
 */
(function ($, root) {

    // 标签切换
    let tagToggle = (btn, panels) => {
        let curIndex
        let lastIndex = 0
        $(btn).unbind()
        $(btn).on("click", function (e) {
            curIndex = $(this).index()
            if (curIndex === lastIndex) {
                // 不变
                return false;
            } else {
                // 样式  
                $(this).toggleClass("select")
                $(btn).eq(lastIndex).toggleClass("select")
                // 展示
                $(panels).eq(lastIndex).hide()
                $(panels).eq(curIndex).show()
                lastIndex = curIndex
            }
        })

    }
    // 标签切换
    let newTagToggle = (btn, styleEle, panels) => {
        let curIndex
        let lastIndex = 0
        $(btn).unbind()
        $(btn).on("click", function (e) {
            curIndex = $(this).index()
            if (curIndex === lastIndex) {
                // 不变
                return false;
            } else {
                // 样式  
                $(this).find(styleEle).toggleClass("select")
                $(btn).eq(lastIndex).find(styleEle).toggleClass("select")
                // 展示
                $(panels).eq(lastIndex).hide()
                $(panels).eq(curIndex).show()
                lastIndex = curIndex
            }
        })
    }

    // pushArticle页面内切换
    let returnSection = () => {
        $(".tag-toggle .toggle-item").each(function () {
            $(this).on("click", function () {
                console.log($(this).index())
                root.showSection($(this).index())
            })
        })
    }

    // 前端防止表单重复提交
    let onceSub = () => {}

    // 选择分类
    let clikMainFl = () => {
        // index = Number(index)
        // if (index == 1) {
        //     domId = "#selectFst"
        // } else {
        //     domId = "#selectSec"
        // }
        let ele_1 = $("#selectFst").next(".layui-unselect")
        ele_1.children(".layui-anim").children("dd").unbind()
        ele_1.children(".layui-anim").children("dd").on("click", function () {
            ele_1.children(".layui-anim").children("dd").removeClass("layui-this")
            $(this).addClass("layui-this")
            let value = $(this).attr("lay-value")
            let text = $(this).text()
            // console.log(value)
            $("#selectFst").val(value)
            ele_1.find("input").val(text)
            root.getSecFl(value)
            console.log(value)
            console.log(text)
        })

        let ele_2 = $("#selectSec").next(".layui-unselect")
        ele_2.children(".layui-anim").children("dd").unbind()
        ele_2.children(".layui-anim").children("dd").on("click", function () {
            ele_2.children(".layui-anim").children("dd").removeClass("layui-this")
            $(this).addClass("layui-this")
            let value = $(this).attr("lay-value")
            let text = $(this).text()
            // console.log(value)
            $("#selectFst").val(value)
            ele_2.find("input").val(text)
            root.getSecFl(value)
        })

    }

    // 删除文章
    let deletArticle = () => {
        // 取对应的topic-id 发后台
        $(".delet-bar").unbind()
        $(".delet-bar").on("click", function (e) {
            let ele = $(this).parent(".articles-item").parent(".articles-bar-b")
            layer.confirm('确定删除文章吗？', {
                btn: ['确定', '取消'] //可以无限个按钮
                    ,
                closeBtn: 1,
                yes: function (index, layero) {
                    console.log($(this))
                    let topicId = ele.attr("topic-id")
                    root.sendDelet(topicId)
                    ele.remove()
                    layer.close(index);
                }
            });

        })
    }
    // 发送文章
    let clickSub = () => {
        $(".submit-btn").unbind()
        $(".submit-btn").on("click", function () {
            var data = $('form').serializeArray();
            console.log(data)
            $(".submit-btn").unbind()
            // 提交文章
            root.submitForm(data)
        })
    }

    // 审核文章
    let shenheClick = () => {
        $(".ds-btn").on("click", function () {
            let com_id = $(this).parents(".comment-item").attr("data-id")
            let result = $(this).attr("data-result")
            console.log(com_id)
            root.sendShenhe(com_id, result)
        })
    }

    // 发表文章评论
    let showCommForm = () => {
        $(".liuyan-btn").on("click", function () {
            $(".com-form").css("display", "flex")
            $(".close-span").on("click", function () {
                $(this).parent(".com-form").css("display", "none")
            })
        })
        root.onceSubmit(".submit-form", ".form-item")
    }

    // 防止重复提交
    let onceSubmit = (btn, form) => {
        $(".submit-form").on("click", function () {
            if ($("textarea").val()) {
                let data = $(".form-item").serializeArray();
                root.sentForm(data)
                $(btn).attr("disabled", "disabled");
                console.log("教师提交提交")
            } else {
                layer.msg("您还没有写评论内容~~")
                return false
            }
        })
    }

    root.newTagToggle = newTagToggle
    root.onceSubmit = onceSubmit
    root.showCommForm = showCommForm
    root.shenheClick = shenheClick
    root.clickSub = clickSub
    root.deletArticle = deletArticle
    root.clikMainFl = clikMainFl
    root.returnSection = returnSection
    root.onceSub = onceSub
    root.tagToggle = tagToggle
}(window.$, window.article || (window.article = {})));

/****************************************************************************** */
/**
 * 渲染
 * render.js
 */
(function ($, root) {

    // 渲染分类下拉
    let renderFenlei = (index) => {
        index = Number(index)
        console.log(index)
        var data
        if (index == 1) {
            data = cachData["fenlei"]
        } else {
            data = cachData["secondFenlei"]
        }
        console.log(cachData["secondFenlei"])
        let num = index - 1
        $(".layui-input-block").eq(num).find("select").empty()
        let baseOption = `
            <option value="">选择分类</option>
        `
        $(".layui-input-block").eq(num).find("select").append(baseOption)
        // $(".layui-input-block").eq(num).find(".layui-anim").empty()
        data.forEach(item => {
            let optionFst = `
                    <option value="${item["id"]}"  data-id="${item["id"]}">${item["name"]}</option>
                `
            let layOption = `
                <dd lay-value="${item["id"]}"  data-id="${item["id"]}" class="">${item["name"]}</dd>
            `
            $(".layui-input-block").eq(num).find("select").append(optionFst)
            // $(".layui-input-block").eq(num).find(".layui-anim").append(layOption)
        });
        // 初始化二级菜单
        let firstVal = $("#selectFst").val()
        console.log(firstVal)
        // root.getSecFl(firstVal)
        layui.use('form', function () {
            var form = layui.form;
            //各种基于事件的操作，下面会有进一步介绍
            // root.getSecFl(firstVal)
            form.render("select")
            // 切换 分类
            // root.renderFenlei(2)
            form.on('select(first)', function (data) {
                let value = $("#selectFst").val()
                console.log(value)
                root.getSecFl(value)
                form.render("select")
            });
        });


    }

    // 切换一级分类时, 二级分类初始化
    let initSecFl = (status) => {
        let domId = "#selectSec"
        let ele = $(domId).next(".layui-unselect")
        let thisEle = ele.children(".layui-anim").children("dd")
        ele.children(".layui-anim").children("dd").removeClass("layui-this")
        thisEle.eq(0).addClass("layui-this")
        // $(domId).val(0)
        // ele.find("input").val('')
        // root.getSecFl("0")

        // 0 二级空 1 二级有
        if (!status) {
            $(domId).val(0)
            ele.find("input").val('无')
            root.getSecFl("0")
        } else {
            $(domId).val(0)
            ele.find("input").val('')
            root.getSecFl("0")
        }

        // 渲染二级分类
        root.renderFenlei(2)
    }


    root.initSecFl = initSecFl
    root.renderFenlei = renderFenlei
}(window.$, window.article || (window.article = {})));

/****************************************************************************** */
/**
 * 初始化
 * init.js
 */
(function ($, root) {
    // pushArticle初始化
    let initPushArticle = () => {
        // 当前页面
        let index
        $(".tag-toggle .toggle-item").each(function () {
            if ($(this).hasClass("select")) {
                index = $(this).index()
                console.log("文章初始化id: " + index)
            }
        })
        return index
    }

    let showSection = (index) => {
        switch (index) {
            case 0:
                // 发布文章
                root.tagToggle(".toggle-item", ".p-article-p")
                // console.log(1234)
                // 文章列表 切换
                root.tagToggle(".tags-item", ".articles-list-b")
                // 删除文章
                root.deletArticle()
                break
            case 1:
                // 发布文章
                // root.tagToggle(".toggle-item", ".p-article-p")
                // console.log(root)
                root.getFenlei()
                // 提交文章
                root.clickSub()
                break
        }
    }

    // 初始化分类为空
    let initFlFst = () => {
        $("#selectFst").val("")
    }

    root.initFlFst = initFlFst
    root.showSection = showSection
    root.initPushArticle = initPushArticle
}(window.$, window.article || (window.article = {})));


/****************************************************************************** */
/**
 * 获取
 * getData.js
 */
(function ($, root) {
    // 提交表单
    let submitForm = (data) => {
        $.ajax({
            url: baseUrl + urlObj["submitUrl"],
            dataType: "JSON",
            data: data,
            type: "POST",
            success: function (data, code) {
                let status = Number(data.msg.code)
                console.log(data)
                if (status == 1) {
                    layer.msg('发布成功！！', {
                        icon: 1,
                        time: 1500
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                    // clearTimeout(timer)
                } else {
                    root.clickSub()
                    layer.msg('文章发布失败~~', {
                        icon: 5,
                        time: 1500
                    });
                }

            },
            error: error
        })
    }

    // ajax获取分类
    let getFenlei = () => {

        $.ajax({
            url: baseUrl + urlObj["fenleiUrl"],
            // url: baseMock + urlObj["fenleiUrl"],
            dataType: "JSON",
            type: "GET",
            success: function (data) {
                cachData.fenlei = data["data"]
                root.renderFenlei(1)
            },
            error: error
        })
    }

    // 统一报错
    let error = () => {
        layer.msg('网络连接失败~~', {
            icon: 5
        });
    }

    // 缓存 二级菜单
    let getSecFl = (value) => {
        let firstId = value
        cachData["fenlei"].forEach(item => {
            // console.log(item)
            if (firstId == item["id"]) {
                let len = item["childcate"].length
                console.log(len)
                // root.renderFenlei(1)
                if (len == 0) {
                    // console.log("空")
                    cachData.secondFenlei = [{
                        "id": "0",
                        "name": "无"
                    }]
                    // 初始化一级分类
                    root.initSecFl(0)
                } else {
                    let data = []
                    item["childcate"].forEach(item2 => {
                        data.push(item2)
                        cachData.secondFenlei = data
                    })
                    // console.log(cachData)
                    // 初始化二级级分类
                    root.initSecFl(1)
                }

            }
        })
    }

    let sendDelet = (id) => {
        let url = baseUrl + urlObj["deletUrl"]
        console.log(url)
        console.log(id)
        $.ajax({
            // http://www.mamawozaizhe.com/mobile2/wenzhang/deleteAjax
            url: url,
            data: {
                "id": id
            },
            type: "POST",
            dataType: "JSON",
            success: function (data) {
                console.log(data)
                layer.msg('删除成功！');
            },
            error: error
        })
    }

    let lazyLoad = (id, page) => {
        $.ajax({
            url: baseUrl + 123,
            type: "POST",
            dataType: ""
        })
    }

    // 发送审核文章请求给后台
    let sendShenhe = (comId, result) => {
        $.ajax({
            url: baseDetUrl + urlObj.shenheCom,
            type: "POST",
            dataType: "JSON",
            data: data = {
                com_id: comId,
                act: result
            },
            success: function (data) {
                console.log(data)
                console.log(data["code"])
                if (data.code == 11) {
                    layer.msg('审核通过！', {
                        icon: 1,
                        time: 1500
                    });
                } else if (data.code == 21) {
                    layer.msg('删除成功！', {
                        icon: 1,
                        time: 1500
                    });
                }
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            },
            error: error
        })
    }

    // 提交文章
    let sentForm = (data) => {
        console.log(data)
        $.ajax({
            url: baseDetUrl + urlObj.subComment,
            type: "POST",
            data: data,
            success: function (data, code) {
                console.log(data, code)
                layer.msg('评论成功，等待管理员审核！', {
                    icon: 1,
                    time: 1500
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            },
            error: error
        })
    }

    root.sentForm = sentForm
    root.sendShenhe = sendShenhe
    root.lazyLoad = lazyLoad
    root.sendDelet = sendDelet
    root.getSecFl = getSecFl
    root.getFenlei = getFenlei
    root.submitForm = submitForm
}(window.$, window.article || (window.article = {})));
/****************************************************************************** */
/**
 * 入口
 * index.js
 */

(function () {
    let root = window.article;
    if (document.getElementById('pushArticle')) {
        // 管理员发布文章
        root.initFlFst()
        let initSection = root.initPushArticle()
        root.showSection(initSection)
        root.returnSection()

    } else if (document.getElementById('wsyIndexWrap')) {
        // 微官网主页
        // 轮播图实例
        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
            },
            loop: true,
            autoplay: {
                disableOnInteraction: false,
            },
        });

    } else if (document.getElementById('artDetWrap')) {
        // 文章详情
        root.shenheClick()
        let textArea = document.getElementsByTagName("textarea")[0]
        root.autoTextarea(textArea)
        root.showCommForm()
    } else if (document.getElementById('wgwListWrp')) {
        // 微官网 二级分类列表
        console.log("二级分类")
        // 轮播图实例
        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
            },
            loop: true,
            autoplay: {
                disableOnInteraction: false,
            },
        });
        // 子分类切换
        root.newTagToggle(".sec-item", ".sec-btn", ".articles-list-b")
    }
}());