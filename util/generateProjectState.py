import os
import argparse
import fnmatch
import sys

def read_gitignore(directory):
    gitignore_path = os.path.join(directory, '.gitignore')
    if os.path.isfile(gitignore_path):
        with open(gitignore_path, 'r') as file:
            return file.read().splitlines()
    return []

def is_ignored(item, ignore_patterns):
    hardcoded_ignore_patterns = ['.gitignore', '.DS_Store']
    for pattern in hardcoded_ignore_patterns:
        if fnmatch.fnmatch(item, pattern):
            return True
    for pattern in ignore_patterns:
        if pattern.endswith('/') and fnmatch.fnmatch(item, pattern[:-1]):
            return True
        if fnmatch.fnmatch(item, pattern):
            return True
    return False

def get_directory_structure(directory, base_directory, max_depth, gitignore, depth=0):
    if depth > max_depth:
        return []
    ignore_patterns = read_gitignore(directory) if gitignore else []
    file_list = []
    for item in os.listdir(directory):
        if is_ignored(item, ignore_patterns):
            continue
        absolute_path = os.path.join(directory, item)
        file_list.append(absolute_path)
        if os.path.isdir(absolute_path):
            file_list.extend(get_directory_structure(absolute_path, base_directory, max_depth, gitignore, depth + 1))
    return file_list

def ask_include_file(file):
    while True:
        answer = input(f"Do you want to include {file} in the project state description? (y/n): ")
        if answer.lower() == 'y':
            return True
        elif answer.lower() == 'n':
            return False
        else:
            print("Invalid input. Please enter 'y' or 'n'.")

def get_file_content(file):
    with open(file, 'r') as f:
        return f.read()

def main():
    parser = argparse.ArgumentParser(description='Generate a project state description.')
    parser.add_argument('baseDirectory', type=str, help='The base directory to start from.')
    parser.add_argument('maxDepth', type=int, help='The maximum depth to explore.')
    parser.add_argument('--gitignore', action='store_true', help='Ignore files and directories specified in .gitignore files.')
    parser.add_argument('--projectDescriptionFile', type=str, help='The path to the project description file.')
    args = parser.parse_args()

    base_directory = args.baseDirectory
    max_depth = args.maxDepth
    gitignore = args.gitignore
    project_description_file = args.projectDescriptionFile

    if not os.path.isdir(base_directory):
        print(f"Error: The directory {base_directory} does not exist.")
        sys.exit(1)

    if max_depth < 0:
        print("Error: The maximum depth must be a non-negative integer.")
        sys.exit(1)

    file_list = get_directory_structure(base_directory, base_directory, max_depth, gitignore)
    included_files = []
    for file in file_list:
        if os.path.isfile(file):
            if ask_include_file(file):
                included_files.append(file)
    if project_description_file and os.path.isfile(project_description_file):
        project_description = get_file_content(project_description_file)
        print(project_description)
    print("Here is the current relevant file structure:\n")
    for file in file_list:
        print(os.path.relpath(file, base_directory))
    print("\n---\nHere are the current contents of the relevant files:\n")
    for file in included_files:
        print("\n\n---\n" + os.path.relpath(file, base_directory))
        print(get_file_content(file))


if __name__ == "__main__":
    main()
