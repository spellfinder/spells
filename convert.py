#!/usr/bin/python

import json
import re
import sys
import ruamel.yaml as yaml


def get_yaml_data():
    raw_data = None
    with open('./data/all.yaml', 'r', encoding='utf-8') as ymldata:
        raw_data = yaml.safe_load(ymldata)
    return raw_data

mandatory_keys = [
    'name', 'type', 'level', 'description', 'traits'
]

type_checks = {
    'casting': list,
    'level': int,
    'heightened': dict,
    'traits': list,
}


def to_id(name):
    return re.sub(r'[^A-Za-z]', '-', name).lower()


def validate(data):
    errors = []
    key_re = re.compile(r'^[a-z]+(-[a-z]+)*$')
    for k, v in data.items():
        if not key_re.match(k):
            errors.append('Invalid key name: {}'.format(k))
            continue
        if not isinstance(v, dict):
            errors.append(
                'Invalid type for "{k}": {vtype} (should be mapping)'.format(
                    k=k,
                    vtype=type(v)
                )
            )
            continue
        for key in mandatory_keys:
            if key not in v:
                errors.append(
                    'Missing "{key}" key in {spellid}'.format(
                        key=key, spellid=k
                    )
                )
        if to_id(v['name']) != k:
            errors.append(
                'Spell ID {id} does not match spell name {name}'.format(
                    id=k, name=v['name']
                )
            )

        for key, expect_type in type_checks.items():
            if key in v and not isinstance(v[key], expect_type):
                errors.append(
                    'Invalid type for "{key}" in {spellid}: {ktype}'
                    ' (should be {expect_type})'.format(
                        key=key, spellid=k, ktype=type(v[key]),
                        expect_type=expect_type
                    )
                )
    return errors


def save_json(data):
    with open('./data/all.json', 'w') as jsonf:
        json.dump(data, jsonf)


def main():
    data = get_yaml_data()
    validation_errs = validate(data)
    if validation_errs:
        for err in validation_errs:
            print(err)
        sys.exit(1)
    print('File validation complete, writing all.json')
    save_json(data)

if __name__ == '__main__':
    main()
