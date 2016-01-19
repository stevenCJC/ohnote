var n=0;
module.exports = {

	getRecommended : function (req, res) {
		n++;
		res.send({
			"code" : 200,
			"msg" : "OK",
			"data" : [{
					"goods" : {
						"agio" : "6.8折",
						"allImages" : [
							"http://a.vpimg2.com/upload/merchandise/419777/ZPD5-6921552599177-5.jpg",
							"http://a.vpimg2.com/upload/merchandise/437598/SEDATE-1115-6.jpg",
							"http://a.vpimg2.com/upload/merchandise/419777/ZPD5-6921552599177-14.jpg"
						],
						"brandId" : 1054119615+n,
						"brandStoreName" : "宾得b",
						"gid" : 124844+n,
						"hiTao" : false,
						"image" : "http://a.vpimg2.com/upload/merchandise/419777/ZPD5-6921552599177-5.jpg",
						"marketPrice" : 62+n,
						"name" : "宾得bLara Style翘卷魅惑电眼美睫器（双温）（粉色）",
						"productName" : "Lara Style翘卷魅惑电眼美睫器（双温）（粉色）",
						"saleOut" : false,
						"salecount" : 0+n,
						"superScripts" : [{
								"icon" : "http://b.appsimg.com/http://c.vpimg1.com/upcb/2015/08/04/95/55483428.png",
								"position" : "1",
								"positionStr" : "左上角",
								"title" : "inatest image for icon"
							}, {
								"icon" : "http://b.appsimg.com/2014/12/30/3225/1419931320589.png",
								"position" : "3",
								"positionStr" : "右上角",
								"title" : "一价全包"
							}, {
								"icon" : "http://b.appsimg.com/2015/01/01/3125/1420100075576.png",
								"position" : "1",
								"positionStr" : "左上角",
								"title" : "韩国"
							}
						],
						"transverseImage" : "",
						"verticalImage" : "http://a.vpimg2.com/upload/merchandise/419777/ZPD5-6921552599177-5.jpg",
						"vipshopPrice" : 288+n
					},
					"goodsStock" : {
						"saled" : 3+n,
						"sizes" : [{
								"sizeId" : 291722+n
							}
						]
					}
				}
			]
		});

	},
	
	get : function (req, res) {
		
		res.send({
			"code" : 200,
			"msg" : "OK",
			"data" : [/*  {
					"goods" : {
						"agio" : "6.8折",
						"allImages" : [
							"http://a.vpimg2.com/upload/merchandise/419777/ZPD5-6921552599177-5.jpg",
							"http://a.vpimg2.com/upload/merchandise/437598/SEDATE-1115-6.jpg",
							"http://a.vpimg2.com/upload/merchandise/419777/ZPD5-6921552599177-14.jpg"
						],
						"brandId" : 1054119615,
						"brandStoreName" : "宾得b",
						"gid" : 124844,
						"hiTao" : false,
						"image" : "http://a.vpimg2.com/upload/merchandise/419777/ZPD5-6921552599177-5.jpg",
						"marketPrice" : 62,
						"name" : "宾得bLara Style翘卷魅惑电眼美睫器（双温）（粉色）",
						"productName" : "Lara Style翘卷魅惑电眼美睫器（双温）（粉色）",
						"saleOut" : false,
						"salecount" : 0,
						"superScripts" : [{
								"icon" : "http://b.appsimg.com/http://c.vpimg1.com/upcb/2015/08/04/95/55483428.png",
								"position" : "1",
								"positionStr" : "左上角",
								"title" : "inatest image for icon"
							}, {
								"icon" : "http://b.appsimg.com/2014/12/30/3225/1419931320589.png",
								"position" : "3",
								"positionStr" : "右上角",
								"title" : "一价全包"
							}, {
								"icon" : "http://b.appsimg.com/2015/01/01/3125/1420100075576.png",
								"position" : "1",
								"positionStr" : "左上角",
								"title" : "韩国"
							}
						],
						"transverseImage" : "",
						"verticalImage" : "http://a.vpimg2.com/upload/merchandise/419777/ZPD5-6921552599177-5.jpg",
						"vipshopPrice" : 288
					},
					"goodsStock" : {
						"saled" : 3,
						"sizes" : [{
								"sizeId" : 291722
							}
						]
					}
				}  */
			]
		});

	},

	suggestion : function (req, res) {

		res.send({
			"code" : 200,
			"msg" : null,
			"data" : ["雨是的鞋", "时代复分", "乐水电费蜂", "乐水电费水电费蜂", "乐是蜂", "乐蜂"]
		});

	},

};
