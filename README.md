
# CV Generator CLI

This project is a dynamic resume (a.k.a. CV) generator. You fill all the infos that you want in your resume and it's transformed in an HTML structure that allows you to generate a PDF by using the `print` function of the browser.

It was created based on the [CV-Generator](https://github.com/erikacarvalh0/cv-generator) - wich requires you to manually fill the object with your infos.

At this CLI, you will run the `cv-cli` command and can fill your resume by answering a series of prompts in your terminal, or you can pass the infos as options to the `cv-cli` command.

## Installing the CLI

In the root directory of the project, you'll install the CLI globally, so the `cv-cli` command will be available for use.

Run the command:
```
npm install -g
```

That's it! You can now start generating your resume by inputing the infos at the terminal! :)

### Dependencies
This project runs `live-server` to open your browser with the resume, so it has to be available globally.

You can install it with the command:
```
npm install -g live-server
```

## CLI options
The `cv-cli` allows you to pass the following options:

    --help            |  Show help                                                                        |  [boolean]
    --version         |  Show version number                                                              |  [boolean]
    -i, --imageUrl    |  Image url to be used at the header                                               |   [string]
    -a, --imageAlt    |  Alt text for the image at the header                                             |   [string]
    -d, --divider     |  Divider between image and personal infos                                         |  [boolean]
    -l, --location    |  Add your location to the header                                                  |   [string]
    -e, --email       |  Add an email to the header                                                       |   [string]
    -p, --profile     |  Add a profile link to the header (your website, github or any profile you want)  |   [string]
    -m, --me          |  Add the content for a section with title About me                                |   [string]
    -g, --language    |  Define this resume language                                                      |   [string]
    -f, --identifier  |  Define this resume identifier                                                    |   [string]
    -t, --theme       |  Define this resume theme                                                         |   [string]


### Usage example
```
cv-cli -i <image-url> -a <image-alt> -d -e <your-email> -l <your
location> -p <your-profile-link> -m <about-me-content> -f <cv-id> -g
<cv-language> -t <cv-theme>
```

### CLI prompts
In case you don't want to pass the infos as options, you'll be able to input the data based on the prompts. The following questions will be available:

*Header*
- `Do you want an image at the header?` - In case you want to add your photo or a logo image
- `Please enter the image url:` - This is the path that will be used as source for `<img>`
- `Please enter the image alternative text:` - For accessibility purposes, I strongly recommend you to add an alt text that describes the image of the previous prompt

*Personal Infos*
- `Do you want a divider for header content?` - This is a visual element (vertical line) to separate the image from your personal infos
- `Wich type of info do you want to add:` - will be able to choose between "text" or "link"
- `Type the content, please:` - this is the content of your info (your email, github profile, location, etc)
- `Now you need to type the link href:` - in case you choose "link" previously, this is the href attribute to the `a` tag

*Section*
- `What's the section title?` - This will be the sections of your resume (about me, skills, etc)
- `And what about it's type?` - You can choose if it's a simple section (title and content), a list or a list with title, subtitle and content
- `What's the item content?` - Text that will be the main info of the section
- `What's the item title?`
- `What's the item subtitle?`

*Metadata*
These infos will be used to identify and style your resume:
- `What is this CV identifier?`
- `What is this CV theme?`
- `What is this CV language?`

## Theme
To add a theme to your resume, you'll have to add a `.css` file to the `./src/themes` folder.

The name of your file must be passed as the `-t` option or at the `What is this CV theme?` prompt (without the extension). 

For example, if you have the file 
```
./src/themes/my-theme.css
```

Your `-t` option will be as shown:
```
cv-cli -t my-theme
```

Or you'll answer the prompt with just `my-theme`.

## The resume
After filling all the infos that you want in your resume, the project will open a new browser tab at the root folder of the folder. Navigate to `./cv-generator/` and will see a list with all the resumes that are available in your folder.
By clicking in one of them, you'll see your infos displayed as a PDF page, so you can hit `ctrl + p` and save it as PDF.

## Project structure
This project is divided in three main features:
- `CLI` - all files related to the CLI itself are at the `./bin` folder
- `CV-generator` - are the files that will get the json data and show it as a webpage - ready to be saved as PDF using `ctrl + p`
    - they're at the `cv-generator` folder at the root of the project
- `files generator` - this is the part of the project that will get the CLI infos and generate a JSON file to the front-end
    - it's the `./src/generateFiles.js` file
