<h2><u>Local Installation Guide</u></h2>
<h5>Dependencies before running</h5>
<ul>
<li>Docker Latest <i>(Will only recommend docker setup from now on)</i></li>
</ul>

<h5>Installation Steps</h5>
<div><b>Step 1:</b></div>
<div><i>Install latest docker desktop</i></div>
<br>
<div><b>Step 2:</b></div>
<div><i>Run this command in the root of the repository</i></div>
<p><i>This creates a docker image with Php 8.2 and Composer, so you don't need to install 
<br>XAMPP,LAMPP or any other dependencies locally.</i></p>
<div><code>docker run --rm \</code></div>
<div><code>&nbsp;&nbsp;&nbsp;-u "$(id -u):$(id -g)" \</code></div>
<div><code>&nbsp;&nbsp;&nbsp;-v "$(pwd):/var/www/html" \</code></div>
<div><code>&nbsp;&nbsp;&nbsp;-w /var/www/html \</code></div>
<div><code>&nbsp;&nbsp;&nbsp;laravelsail/php82-composer:latest \</code></div>
<div><code>&nbsp;&nbsp;&nbsp;composer install --ignore-platform-reqs</code></div>
<br>
<div><b>Step 3:</b></div>
<div><i>Now that the images and containers are installed. Run the command below</i></div>
<div><code>sail up</code> or <code>sail up -d</code> for a detached mode</div>
<br>
<div><b>Step 4:</b></div>
<div><i>Almost done, but a few commands must be run before you can start developing,<br>
run <code>sail artisan storage:link</code> then open 2 more terminals or use tmux to <br>
run these next commands so the queues, scheduled jobs(cron), <br>
and npm watch(to watch for front-end changes) to work locally.
</i></div>
<ul>
<li><code>sail artisan queue:listen</code></li>
<li><code>sail artisan schedule:work</code></li>
<li><code>sail npm run dev</code></li>
</ul>

<p>
That's it! You could start working on react in ./resources/js and the rest of the directories and files for laravel
</p>


<h2><u>Design</u><h2>

<h3>Models</h3>
<p>Models are allowed to define relationships from other modules. <i>Strictly for relationships only.</i></p>
<p><u><b><i>How to structure models</i></b></u></p>
<ul>
<li>traits</li>
<li>constants</li>
<li>properties</li>
<li>constant getters</li>
<li>relationships declaration</li>
<li>relationships pivot declaration</li>
<li>field where scopes</li>
<li>field order scopes</li>
<li>relationship field where scopes</li>
<li>relationship field order scopes</li>
<li>custom scopes</li>
<li>slug</li>
</ul>

<p><u><b><i>Bulk assignments</i></b></u></p>
<p>Models that does mass assignments won't trigger the model observer. Better to make an event if you 
<br>to trigger an event when doing mass assignments</p>


<h3>Resource</h3>
<p><u><b><i>How to structure resource</i></b></u></p>
<ul>
<li>fields defined in table migration in the same order</li>
<li>has one or belongs to one resource relationships</li>
<li>has many or belongs to many resource relationships</li>
<li>custom attributes</li>
</ul>


<h3>Seeders</h3>
<p>Seeders should be declared manually because seeders may rely on another seeder, manual declarations gives the ability to change the order of the
seeds.</p>

<h3>Events and Jobs</h3>
<ul>
<li>Make sure the order of jobs and events respects the pre-requisites first before dispatching</li>
<li>Pre-mature dispatching of events and jobs may cause bad data.</li>
</ul>

<h3>API Responses</h3>
<p>"option" method should define the fields that is used for getting the data</p>

<p><u><b><i>Response allowed status code</i></b></u></p>
<ul>
<li>201 created</li>
<li>204 updated</li>
<li>204 deleted</li>
<li>401 unauthorized</li>
<li>403 authorized but not allowed</li>
<li>404 resource not found</li>
<li>422 incorrect payload</li>
</ul>



<s>
<h3>Frontend Forms</h3>
<p><u><b><i>How form fields should be read for easier debugging</i></b></u></p>
<ul>
<li>First row left column top to bottom then right column top to bottom</li>
<li>Second row left column top to bottom then right column top to bottom</li>
<li>Third row....</li>
</ul>

<h3>Initial Value Rules</h3>
<ul>
<li>Initial values can have nullable FormRequest fields but should be required in the front-end</li>
<li>But the initial values that are supposed to be required in the FormRequest are now "auto-filled" in the observer</li>
<li>If something really is required from the FormRequest, then the value must always be provided</li>
</ul>
</s>


<h3>Limitations</h3>
<ul>
<li>MENU: App section menu can only have level 2 nested children</li>
<li>MENU: Urls should be unique, because the generator might get confused</li>
</ul>


