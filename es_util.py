# coding:utf-8

from elasticsearch import Elasticsearch
import json

es = Elasticsearch()

mapping = {
    'properties': {
        'title': {
            'type': 'text',
            'analyzer': 'ik_max_word',
            'search_analyzer': 'ik_max_word'
        }
    }
}

def create_index(_index):
    result = es.indices.create(index=_index, ignore=400)
    print(result)

def delete_index(_index):
    result = es.indices.delete(index=_index, ignore=[400,404])
    print(result)

def insert_into_index(_index,_doc_type,_data):
    result = es.index(index=_index,doc_type=_doc_type,body=_data)
    print(result)

def search_index(_index,_doc_type):
    result = es.search(index=_index,doc_type=_doc_type)
    print(result)

if __name__ == "__main__":
    delete_index("my_first_index")
    create_index("my_first_index")
    result = es.indices.put_mapping(index="my_first_index",doc_type="politics",body=mapping)
    datas = [
        {
            'title': '美国留给伊拉克的是个烂摊子吗',
            'url': 'http://view.news.qq.com/zt2011/usa_iraq/index.htm',
            'date': '2011-12-16'
        },
        {
            'title': '公安部：各地校车将享最高路权',
            'url': 'http://www.chinanews.com/gn/2011/12-16/3536077.shtml',
            'date': '2011-12-16'
        },
        {
            'title': '中韩渔警冲突调查：韩警平均每天扣1艘中国渔船',
            'url': 'https://news.qq.com/a/20111216/001044.htm',
            'date': '2011-12-17'
        },
        {
            'title': '中国驻洛杉矶领事馆遭亚裔男子枪击 嫌犯已自首',
            'url': 'http://news.ifeng.com/world/detail_2011_12/16/11372558_0.shtml',
            'date': '2011-12-18'
        },
        {
            'title': '测试测试',
            'url': 'http://news.ifeng.com/world/detail_2011_12/16/11372558_0.shtml',
            'date': '1111-11-11'
        }
    ]
    
    for data in datas:
        insert_into_index('my_first_index', 'politics', data)
        
    # search_index('my_first_index','politics')
    dsl={
        'query':{
            'match_all':{
            }
        }
    }

    # es = Elasticsearch()
    result=es.search(index='my_first_index',body=dsl)
    print(json.dumps(result,indent=2,ensure_ascii=False))