<h3>Modules <h3>

<h5>Models</h5>
<p>Models are allowed to define relationships from other modules. <i>Strictly for relationships only.</i></p>
<p><u><b><i>How to structure models</i></b></u></p>
<ul>
<li>traits</li>
<li>constants</li>
<li>properties</li>
<li>constant getters</li>
<li>searchable, & sortable fields getter</li>
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


php artisan storage:link



<h5>Bulk Assignments</h5>
<p>Models that's only purpose is to be inserted, updated, deleted through bulk should be careful on making observers</p>
