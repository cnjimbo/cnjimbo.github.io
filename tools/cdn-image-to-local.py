import codecs
import os
import re
from urllib.parse import unquote, quote
import requests

root = 'G:/vPress/cnjimbo.github.io/packages/blogpress'
# root = 'G:/vPress/cnjimbo.github.io/packages/blogpress/technology/works'
img_ext_supportted = ('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg')
# 对每个文件中的链接分别进行下载和替换链接处理
img_url_starts = ('https://img.cdn', 'https://cdn.upyun', 'https://pic',
                  'https://p3-juejin', 'https://wingman-1300536089.file')
param_name='s1'

def main():

    walk_dirs(root)


# 要排除的目录列表
starts = ('.')
ends = ('node_modules')


def walk_dirs(path):
    for current, dirs, files in os.walk(path):
        # 移除需要排除的目录
        parent = os.path.dirname(current)
        # print('parent', parent)
        dirs[:] = [
            d for d in dirs
            if not d.startswith(starts) and not d.endswith(ends)
        ]
        files[:] = [f for f in files if f.endswith('.md')]
        # 打印当前目录路径
        # print(f"Curr Dir: {current}")
        # print(f"dirs: {dirs}")
        # 遍历并打印当前目录下的文件
        for file in files:
            # print(f"File: {os.path.join(current, file)}")
            download(os.path.join(current, file), currentDir=current)


def download(file_path, currentDir):

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

        if image_url.startswith(img_url_starts) or (
                image_url.startswith('http')
                and image_url.endswith(img_ext_supportted)):
            print(" ")
            print(" ")
            print("==> :", file_path)
            print("---Imageurl:", image_url)
            try:
                # download img
                img_data = requests.get(image_url).content
                # img name spell
                image_name = image_url.strip("/").split("/")[-1]

                image_folder = os.path.join(currentDir, dir_name)
                if not os.path.exists(image_folder):
                    os.mkdir(image_folder)

                name_with_ext = unquote(image_name)
                if not name_with_ext.endswith(img_ext_supportted):
                    name_with_ext = f"{name_with_ext}.png"

                # print(name_with_ext)
                image_relative = f"./{dir_name}/{name_with_ext}?{param_name}={quote(image_url)}"
                print('   Relative:', image_relative)
                image_path = os.path.join(currentDir, dir_name, name_with_ext)
                print("   Diskpath:", image_path)

                # write to file
                with open(image_path, 'wb') as handler:
                    handler.write(img_data)

                text = text.replace(f"![{image_quote}]({image_url})",
                                    f"![{image_quote}]({image_relative})")

                with codecs.open(file_path, mode="w+", encoding="UTF-8") as f:
                    f.write(text)
            except:
                print('errrrrrrrrrrrr')
                continue


main()
