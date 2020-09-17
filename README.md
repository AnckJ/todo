# todo
## 描述

koa2+mongodb

koa2完成服务器，监听3000端口。

mongoose编写数据库，完成了用户集合和todo集合。

使用jsonwebtoken验证。

## 实现接口：

/api/user	用户集合

	/register		  注册用户

		@params {
			username: 'string',	// 唯一，4-10位
			password: 'string',	// 4-10位
			email: 'string'
		}

	/login			   用户登录

		@params {
			username: 'string',
			password: 'string'
		}

	/list				   获取用户列表

	/read				 获取当前用户信息

	/update			更新用户

/api/todo	todo集合

	/list				获取当前用户的todo列表

		@params {
			page: 'number|undefined',	// 页码
			size: 'number'	// 每页数量
		}

	/insert			添加当前用户的todo

		@params {
			name: 'string',	// 名称
			desc: 'string'	// 描述
		}

	/update		 更新todo

		@params {
			_id: 'number',	// _id
			ids: 'array',	// _id数组，实现批量操作，优先于_id
			name: 'string',	// 名称
			status: 'string'	// 状态：[*'unfinish', 'completed']
		}

	/delete		  删除todo

		@params {
			_id: 'number',	// _id
			ids: 'array',	// _id数组，实现批量操作，优先于_id
		}

## 开启服务步骤：

1、安装mongodb客户端

2、npm install

3、npm run start

4、浏览器访问 http://127.0.0.1:3000