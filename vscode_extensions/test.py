import codecs
import os
import re

import requests


def main():
    root = 'G:/vPress/cnjimbo.github.io/packages/blogpress'

    walk_dirs(root)


# 要排除的目录列表
starts = ('.')
ends = ('node_modules')


def walk_dirs(path):
    for current, dirs, files in os.walk(path):
        # 移除需要排除的目录
        parent = os.path.dirname(current)
        print('parent', parent)
        dirs[:] = [
            d for d in dirs
            if not d.startswith(starts) and not d.endswith(ends)
        ]
        files[:] = [f for f in files if f.endswith('.md')]
        # 打印当前目录路径
        print(f"Curr Dir: {current}")
        print(f"dirs: {dirs}")
        # 遍历并打印当前目录下的文件
        for file in files:
            print(f"File: {os.path.join(current, file)}")
            download(os.path.join(current, file), currentDir=current)


# 对每个文件中的链接分别进行下载和替换链接处理
img_url_starts = ('https://img.cdn', 'https://cdn.upyun', 'https://pic',
                  'https://p3-juejin',
                  'https://wingman-1300536089.file')


def download(file_path, currentDir):
    print("==> Now dealing with file:", file_path)
    dir_name, extension = os.path.splitext(os.path.split(file_path)[-1])
    # filename = "test"
    name = file_path.split(u"/")
    filename = name[-1]
    with codecs.open(file_path, encoding="UTF-8") as f:
        text = f.read()
    # regex  .*? this is special regular expression for non-greedy match
    result = re.findall(r'!\[(.*?)\]\((.*?)\)', text)

    for i, content in enumerate(result):
        image_quote = content[0]
        image_url = content[1]
        if not (image_url.startswith('http') and image_url.endswith(
            ('.png', '.jpg', '.jpeg', '.gif',
             '.bmp'))) and not image_url.startswith(img_url_starts):
            continue

        try:
            # download img
            img_data = requests.get(image_url).content
            # img name spell
            image_name = image_url.strip("/").split("/")[-1]
            image_path = os.path.join(currentDir, dir_name, image_name)
            print("==>", image_path, '~~~', image_url)
            image_folder = os.path.join(currentDir, dir_name)
            if not os.path.exists(image_folder):
                os.mkdir(image_folder)
            # write to file
            with open(image_path, 'wb') as handler:
                handler.write(img_data)

            text = text.replace(
                "![" + image_quote + "](" + image_url + ")", "![" +
                image_quote + "](" + os.path.join(dir_name, image_name) + ')')
        except:
            print('errrrrrrrrrrrr')
            continue
    with codecs.open(file_path, mode="w+", encoding="UTF-8") as f:
        f.write(text)


main()
