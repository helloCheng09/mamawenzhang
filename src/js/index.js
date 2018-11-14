/**
 * 全局数据
 * data.js
 */
(function () {

}());

/****************************************************************************** */
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
    let onceSub = () => {

    }


    root.returnSection = returnSection
    root.onceSub = onceSub
    root.tagToggle = tagToggle
}(window.$, window.article || (window.article = {})));

/****************************************************************************** */
/**
 * 渲染
 * render.js
 */
(function ($, root) {}(window.$, window.article || (window.article = {})));

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
            }
        })
        return index
    }

    let showSection = (index) => {
        switch (index) {
            case 0:
                // 发布文章
                root.tagToggle(".toggle-item", ".p-article-p")
                console.log(root)
                break
            case 1:
                console.log(1234)
                // 文章列表 切换
                root.tagToggle(".tags-item", ".articles-list-b")
                break
        }
    }

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
    let submitForm = () => {

    }

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
        let initSection = (root.initPushArticle())
        root.showSection(initSection)
        root.returnSection()

    } else if (document.getElementById('wsyIndexWrap')) {
        // 轮播图实例
        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
            },
        });

    }
}());