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
<li>field where scopes</li>
<li>field order scopes</li>
<li>relationship field where scopes</li>
<li>relationship field order scopes</li>
<li>custom scopes</li>
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



-Options with initial value with many options only has one value. making it confusing on initial render

-order lines has if has option, value changes because its a different key making it not reload on change (what?)

-options values not loading properly if value is not on initial system limit render

-create a sluggable column instead and make observer to generate slug

-recursion shall be delegated in the front end

-Fix deployment permissions

-breadcrumbs slug not changing on update
