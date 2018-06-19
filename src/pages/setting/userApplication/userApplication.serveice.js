/**
 * Created by daidongdong on 2018/6/5.
 */
angular.module('settingModule')
  .service('userApplicationService', [
    function () {
      this.provinces = [
        {
          "name": "北京",
          "citys": [
            "北京"
          ],
          "arr": []
        },
        {
          "name": "上海",
          "citys": [
            "上海"
          ],
          "arr": []
        },
        {
          "name": "天津",
          "citys": [
            "天津"
          ],
          "arr": []
        },
        {
          "name": "重庆",
          "citys": [
            "重庆"
          ],
          "arr": []
        },
        {
          "name": "广东",
          "citys": [
            "广州",

            "深圳",

            "珠海",

            "汕头",

            "韶关",

            "佛山",

            "江门",

            "湛江",

            "茂名",

            "肇庆",

            "惠州",

            "梅州",

            "汕尾",

            "河源",

            "阳江",

            "清远",

            "东莞",

            "中山",

            "潮州",

            "揭阳",

            "云浮",

            "其他"
          ],
          "arr": []
        },
        {
          "name": "辽宁",
          "citys": [
            "沈阳",
            "大连",
            "鞍山",
            "抚顺",
            "本溪",
            "丹东",
            "锦州",
            "营口",
            "阜新",
            "辽阳",
            "盘锦",
            "铁岭",
            "朝阳",
            "葫芦岛",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "江苏",
          "citys": [
            "南京",
            "苏州",
            "无锡",
            "常州",
            "镇江",
            "南通",
            "泰州",
            "扬州",
            "盐城",
            "连云港",
            "徐州",
            "淮安",
            "宿迁",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "湖北",
          "citys": [
            "武汉",
            "黄石",
            "十堰",
            "荆州",
            "宜昌",
            "襄樊",
            "鄂州",
            "荆门",
            "孝感",
            "黄冈",
            "咸宁",
            "随州",
            "仙桃",
            "天门",
            "潜江",
            "神农架",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "四川",
          "citys": [
            "成都",
            "自贡",
            "攀枝花",
            "泸州",
            "德阳",
            "绵阳",
            "广元",
            "遂宁",
            "内江",
            "乐山",
            "南充",
            "眉山",
            "宜宾",
            "广安",
            "达州",
            "雅安",
            "巴中",
            "资阳",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "陕西",
          "citys": [
            "西安",
            "铜川",
            "宝鸡",
            "咸阳",
            "渭南",
            "延安",
            "汉中",
            "榆林",
            "安康",
            "商洛",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "河北",
          "citys": [
            "石家庄",
            "唐山",
            "秦皇岛",
            "邯郸",
            "邢台",
            "保定",
            "张家口",
            "承德",
            "沧州",
            "廊坊",
            "衡水",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "山西",
          "citys": [
            "太原",
            "大同",
            "阳泉",
            "长治",
            "晋城",
            "朔州",
            "晋中",
            "运城",
            "忻州",
            "临汾",
            "吕梁",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "河南",
          "citys": [
            "郑州",
            "开封",
            "洛阳",
            "平顶山",
            "安阳",
            "鹤壁",
            "新乡",
            "焦作",
            "濮阳",
            "许昌",
            "漯河",
            "三门峡",
            "南阳",
            "商丘",
            "信阳",
            "周口",
            "驻马店",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "吉林",
          "citys": [
            "吉林",
            "四平",
            "辽源",
            "通化",
            "白山",
            "松原",
            "白城",
            "延边朝鲜自治区",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "黑龙江",
          "citys": [
            "哈尔滨",
            "齐齐哈尔",
            "鹤岗",
            "双鸭山",
            "鸡西",
            "大庆",
            "伊春",
            "牡丹江",
            "佳木斯",
            "七台河",
            "黑河",
            "绥远",
            "大兴安岭地区",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "内蒙古",
          "citys": [
            "呼和浩特",
            "包头",
            "乌海",
            "赤峰",
            "通辽",
            "鄂尔多斯",
            "呼伦贝尔",
            "巴彦淖尔",
            "乌兰察布",
            "锡林郭勒盟",
            "兴安盟",
            "阿拉善盟"
          ],
          "arr": []
        },
        {
          "name": "山东",
          "citys": [
            "济南",
            "青岛",
            "淄博",
            "枣庄",
            "东营",
            "烟台",
            "潍坊",
            "济宁",
            "泰安",
            "威海",
            "日照",
            "莱芜",
            "临沂",
            "德州",
            "聊城",
            "滨州",
            "菏泽",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "安徽",
          "citys": [
            "合肥",
            "芜湖",
            "蚌埠",
            "淮南",
            "马鞍山",
            "淮北",
            "铜陵",
            "安庆",
            "黄山",
            "滁州",
            "阜阳",
            "宿州",
            "巢湖",
            "六安",
            "亳州",
            "池州",
            "宣城"
          ],
          "arr": []
        },
        {
          "name": "浙江",
          "citys": [
            "杭州",
            "宁波",
            "温州",
            "嘉兴",
            "湖州",
            "绍兴",
            "金华",
            "衢州",
            "舟山",
            "台州",
            "丽水",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "福建",
          "citys": [
            "福州",
            "厦门",
            "莆田",
            "三明",
            "泉州",
            "漳州",
            "南平",
            "龙岩",
            "宁德",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "湖南",
          "citys": [
            "长沙",
            "株洲",
            "湘潭",
            "衡阳",
            "邵阳",
            "岳阳",
            "常德",
            "张家界",
            "益阳",
            "滨州",
            "永州",
            "怀化",
            "娄底",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "广西",
          "citys": [
            "南宁",
            "柳州",
            "桂林",
            "梧州",
            "北海",
            "防城港",
            "钦州",
            "贵港",
            "玉林",
            "百色",
            "贺州",
            "河池",
            "来宾",
            "崇左",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "江西",
          "citys": [
            "南昌",
            "景德镇",
            "萍乡",
            "九江",
            "新余",
            "鹰潭",
            "赣州",
            "吉安",
            "宜春",
            "抚州",
            "上饶",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "贵州",
          "citys": [
            "贵阳",
            "六盘水",
            "遵义",
            "安顺",
            "铜仁",
            "毕节",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "云南",
          "citys": [
            "昆明",
            "曲靖",
            "玉溪",
            "保山",
            "邵通",
            "丽江",
            "普洱",
            "临沧",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "西藏",
          "citys": [
            "拉萨",
            "那曲地区",
            "昌都地区",
            "林芝地区",
            "山南区",
            "阿里区",
            "日喀则",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "海南",
          "citys": [
            "海口",
            "三亚",
            "五指山",
            "琼海",
            "儋州",
            "文昌",
            "万宁",
            "东方",
            "澄迈县",
            "定安县",
            "屯昌县",
            "临高县",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "甘肃",
          "citys": [
            "兰州",
            "嘉峪关",
            "金昌",
            "白银",
            "天水",
            "武威",
            "酒泉",
            "张掖",
            "庆阳",
            "平凉",
            "定西",
            "陇南",
            "临夏",
            "甘南",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "宁夏",
          "citys": [
            "银川",
            "石嘴山",
            "吴忠",
            "固原",
            "中卫",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "青海",
          "citys": [
            "西宁",
            "海东地区",
            "海北藏族自治区",
            "海南藏族自治区",
            "黄南藏族自治区",
            "果洛藏族自治区",
            "玉树藏族自治州",
            "还西藏族自治区",
            "其他"
          ],
          "arr": []
        },
        {
          "name": "新疆",
          "citys": [
            "乌鲁木齐",
            "克拉玛依",
            "吐鲁番地区",
            "哈密地区",
            "和田地区",
            "阿克苏地区",
            "喀什地区",
            "克孜勒苏柯尔克孜",
            "巴音郭楞蒙古自治区",
            "昌吉回族自治州",
            "博尔塔拉蒙古自治区",
            "石河子",
            "阿拉尔",
            "图木舒克",
            "五家渠",
            "伊犁哈萨克自治区",
            "其他"
          ],
          "arr": []
        }
      ]
    }]);
