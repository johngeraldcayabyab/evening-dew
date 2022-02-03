<h3>Modules <h3>

<h5>Models</h5>
<p>Models are allowed to define relationships from other modules. <i>Strictly for relationships only.</i></p>

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

NEED to improve form. incorrect details doesnt remove loading Form doesnt highlight error message



