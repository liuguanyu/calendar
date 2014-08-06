/*******************************
 * 农历算法 
 * liuguanyu@360.cn
 *******************************/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser globals
        root.lunar = factory();
    }
}(this , function (){   
    /* 儒略日计算相关,儒略日:http://baike.baidu.com/view/3870278.htm */    
    var JulianDay = {
        /* 公元2000年1月1日的儒略日计数，用于简化计算 */
        JD2000 : 2451545 ,

        /* 将公历转为儒略日 */
        toJulianDay : function(oDate){
            var y = oDate.getFullYear(),
                m = oDate.getMonth() + 1, 
                /* 当前儒略日的不满一个月的部分 */
                d = oDate.getDate() + ((oDate.getSeconds() / 60 + oDate.getMinutes()) / 60 + oDate.getHours()) / 24;

            /**********************************************************************************************************************
             *   公历分为两个阶段:
             *   (1) 1582年10月31日之前为儒略历,实行4年1闰制
             *   (2) 1582年11月10日后实行400年97闰,是格里高利历。
             * 
             *   两阶段之间少了10天,是因为以前的4年1闰不精确,闰过头了,造成日历时比真太阳慢了10天,到了1582年10月31日进行10天负闰。
             *   是有十天在历法上不显示:1582年10月5日—1582年10月14日
             *   历史上,闰过头或闰过少的的事件很多,各国也有所不同。
             *   格里高利13世的新历法颁布以后，只有当时的天主教国家意大利、波兰、西班牙、葡萄牙开始用新历，1582年10月4日之后跳过10日。
             *   下面的算法 用1582*372 + 10*31 + 15 即为588829,也就是说 1582年10月15日开始才是格里高利历。
             *   为什么年乘以372 而不是 365 ？为什么月乘以31而不是其他 
             *   在我感觉，就是一个标识，证明一下是大于1582年10月15日就好了，你大可以
             *   由于新历法是教皇颁布的，新教国家予以抵制。直到儒略历1752年9月2日，大英帝国，包括英格兰、苏格兰、以及现在美国的一部份
             *   才采纳格里历，于是那天之后就直接从9月2日跳到9月14日，日期跳过11日。
             *   这也说明,人们对太阳系运动规律的认识是不断提高的,而不是一步到位的。
             *   所谓正负闰,正闰指给该年份加一些天数,负闰指给该年份减一些天数。
             *   部分摘自：http://www.fjptsz.com/xxjs/xjw/rj/113.htm
             *             http://blog.sina.com.cn/s/blog_719a21b70100xzxf.html
             *             http://www.docin.com/p-309851008.html
             *   意外发现一本译作：http://www.fjptsz.com/xxjs/xjw/rj/117/index.htm 《天文算法》 
             ************************************************************************************************************************/    
            var isGregory = y * 372 + m * 31 + Math.floor(d) >= 588829,
                numLeap = 0;

            /* 如小于3，则算上一年的第13月，14月 http://www.docin.com/p-373244336.html p5*/    
            if (m <= 2) {
                m += 12;
                y -= 1;
            }

            /* 为格里高利历之前的朱利安历补闰，如果是格里高利历，之前朱利安历的闰年需要补上 */
            if (isGregory) {
                numLeap = Math.floor(y / 100);
                numLeap = 2 - numLeap + Math.floor(numLeap / 4);
            }

            /* 将公历转为儒略日 */
            return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + numLeap - 1524.5;
        }
    };

    /* 节气 */
    var Term = {

    }
}));