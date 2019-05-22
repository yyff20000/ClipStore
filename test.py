from elasticsearch import Elasticsearch

es = Elasticsearch()


def main():
    index_name = 'stu'
    type_name = 'doc'

    ##########################################
    # 查看所有索引
    # alias = es.indices.get_alias()
    # print(alias)

    # # 查询所有index名称
    # result = es.indices.get_alias().keys()
    # print(result)

    # # 查询index信息,包含mapping  settings信息
    # result = es.indices.get(index_name)
    # print(result)

    # # 查看指定index的mapping信息
    # result = es.indices.get_mapping(index_name)
    # print(result)

    # # 查看指定index的mapping信息
    # result = es.indices.get_settings(index_name)
    # print(result)

    school_index = "school"
    school_type = "doc"
    school_mapping = {
        "doc": {
            "properties": {
                "schoolId": {
                    "type": "text",
                    "index": True
                },
                "schoolName": {
                    "type": "text",
                    "analyzer": "ik_max_word"
                }
            }
        }
    }
    # 创建索引（创建的同时也可指定mapping）
    es.indices.create(school_index)
    # es.indices.create(school_index,school_mapping)

    # 设置mapping
    es.indices.put_mapping(doc_type=school_type, body=school_mapping, index=school_index)

    ##############################################################

    # 查询所有数据
    result = es.search(index=index_name, doc_type=type_name)
    print(result)
    print(result['hits']['hits'])

    # 指定条件查询
    query_body = {'query': {'term': {'stuId': '005'}}}
    result = es.search(index=index_name, doc_type=type_name, body=query_body)
    print(result)
    print(result['hits']['hits'])

    # 根据id查询
    result = es.get(index_name, type_name, '5')
    print(result)

    # 插入或更新数据
    doc = {'id': 7, 'stuId': '007', 'stuName': '大明1', 'createTime': 1529506498685}
    es.index(index_name, type_name, doc, doc['id'])

    # 删除数据
    es.delete(index_name, type_name, '7')


if __name__ == '__main__':
    main()
