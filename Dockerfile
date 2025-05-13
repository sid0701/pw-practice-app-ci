#each file usually starts with a base image, something that we need to build our image
#the base image to be used can be found on playwright documentation
#it gives us a base recommended image that has all needed dependencies
#such as OS, nodeJS n any other dependencies that r needed to successfully run playwright inside of d container
#playwright version should match d version that i have in package.json
FROM mcr.microsoft.com/playwright:v1.51.1-noble

#now lets create a new folder where we will keep our project
RUN mkdir /app

#Now we will do all our work in thisdirectory
WORKDIR /app

#now we will copy all our files from host computer to docker container
COPY . /app/

#now we want to install all dependencies related to our test project
#depenencies r installed from package.json
# --force is used to make sure we will not have any dependencies conflict
RUN npm install --force

#with this command, we will install all required browsers that r needed for d playwright to run d test
#so it will install chromium, fireox n webkit
RUN npx playwright install