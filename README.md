<h3>Modules <h3>

<h5>Models</h5>
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

<h5>Resource</h5>
<p><u><b><i>How to structure resource</i></b></u></p>
<ul>
<li>fields define in table migration in same order</li>
<li>has one or belongs to one resource relationships</li>
<li>has many or belongs to many resource relationships</li>
<li>custom attributes</li>
</ul>

<h5>Frontend Forms</h5>
<p><u><b><i>How form fields should be read for easier debuggin</i></b></u></p>
<ul>
<li>First row left column top to bottom then right column top to bottom</li>
<li>Second row left column top to bottom then right column top to bottom</li>
<li>Third row....</li>
</ul>

<h5>Seeders</h5>
<p>Seeders should be declared manually because seeders may rely on another seeder, manual declarations gives the ability to change the order of the
seeds.</p>


<h5>API Responses</h5>
<p>"option" method should define the fields that is used for getting the data</p>

<ul>
<li>401 unauthorized</li>
<li>403 authorized but not allowed</li>
<li>422 incorrect payload</li>
</ul>


php artisan storage:link php artisan event:cache

<h5>Bulk Assignments</h5>
<p>Models that's only purpose is to be inserted, updated, deleted through bulk should be careful on making observers</p>




-create a sluggable column instead and make observer to generate slug (second thought)

-recursion shall be delegated in the front end

-Fix deployment permissions

-breadcrumbs slug not changing on update

-export backend api to be used by front-end

-theres a problem in form item date

-form options, doesnt show values if over system limit

-Children should never reference parent as resources in resource

<h5>Initial Deployment</h5>
<ul>
<li><code>php artisan storage:link</code></li>
<li><code>php artisan queue:work</code></li>
<li><code>php artisan optimize:clear</code></li>
</ul>


<h5>Initial Value Rules</h5>
<ul>
<li>Initial values can have nullable FormRequest fields but should be required in the front-end</li>
<li>But the initial values that are supposed to be required in the FormRequest are now "auto-filled" in the observer</li>
<li>If something really is required from the FormRequest, then the value must always be provided</li>
</ul>

<h5>Events and Jobs</h5>
<ul>
<li>Make sure the order of jobs and events respects the pre-requisites first before dispatching</li>
<li>Pre-mature dispatching of events and jobs may cause bad data.</li>
</ul>


<h5>Dependencies before running</h5>
<ul>
<li>Php 7.4</li>
<li>Redis</li>
<li>Composer</li>
<li>Node 14.9</li>
<li>Mysql</li>
</ul>


<h5>Limitations</h5>
<ul>
<li>MENU: App section menu can only have level 2 nested children</li>
<li>MENU: Urls should be unique, because the generator might get confused</li>
</ul>
