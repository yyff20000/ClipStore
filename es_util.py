# coding:utf-8

from elasticsearch import Elasticsearch
import json
import os
import time
import hashlib
# import es_config

es = Elasticsearch()


def get_sha1_value(_str):                                                      
    my_sha = hashlib.sha1()
    my_sha.update(_str)
    my_sha_Digest = my_sha.hexdigest()
    return my_sha_Digest

def get_time_stamp():
    time_str = str(int(round(time.time() * 1000))).encode()
    return get_sha1_value(time_str)

def create_index(_index):
    # content = os.popen("curl -XPUT http://localhost:9200/"+_index).read()
    content = es.indices.create(index=_index,ignore=400)
    print(content)

def delete_index(_index):
    # content = os.popen("curl -XDELETE http://localhost:9200/"+_index).read()
    content = es.indices.delete(index=_index,ignore=[400,404])
    print(content)

def insert_into_index(_index,_data):
    content = os.popen("curl -XPOST http://localhost:9200/"+_index+"/_create/"+get_time_stamp()+" -H 'Content-Type:application/json' -d'"+json.dumps(_data)+"'\n").read()
    # result = es.index(index=_index,body=_data)
    print(content)

def create_mapping(_index,_mapping):
    content = os.popen("curl -XPOST http://localhost:9200/"+_index+"/_mapping -H 'Content-Type:application/json' -d'"+json.dumps(_mapping)+"\n'").read()
    print(content)


def search_index(_index,dsl):
    # result = es.search(index=_index,doc_type=_doc_type)
    # print(result)
    content = os.popen("curl -XPOST http://localhost:9200/"+_index+"/_search  -H 'Content-Type:application/json' -d'"+json.dumps(dsl)+"\n'").read()
    print(content)


if __name__ == "__main__":
    # 清空数据库
    _index = "myindex"
    delete_index(_index)
    create_index(_index)

    # 插入mapping
    mapping = {
        "properties": {
            "name": {
                "type":    "string",
                "index": "not_analyzed"
            },
            "phone": {
                "type":    "string",
                "index": "not_analyzed"
            }
        }
    }

    es.indices.put_mapping(_index,body=mapping)

    a = es.indices.get_mapping(_index)
    print(a)






    