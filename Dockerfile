# A dockerfile must always start by importing the base image.
# We use the keyword 'FROM' to do that.
# In our example, we want import the python image.
# So we write 'python' for the image name and 'latest' for the version.
FROM python:3.10-alpine

# In order to launch our python code, we must import it into our image.
# We use the keyword 'COPY' to do that.
# The first parameter 'main.py' is the name of the file on the host.
# The second parameter '/' is the path where to put the file on the image.
# Here we put the file at the image root folder.

COPY /server /

# We need to define the command to launch when we are going to run the image.
# We use the keyword 'CMD' to do that.
# The following command will execute "python ./main.py".
RUN apk update
RUN apk add bash
RUN apk add python3-dev
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# RUN initial sqlite3 script
RUN python3 init_db.py
#CMD [ "python3", "server.py" ]
CMD [ "gunicorn", "-b 0.0.0.0:5000","wsgi:flask_app" ]