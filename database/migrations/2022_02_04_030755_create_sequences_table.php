<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSequencesTable extends Migration
{
    public function up()
    {
        Schema::create('sequences', function (Blueprint $table) {
            /**
             *  help="Two sequence object implementations are offered: Standard "
             * "and 'No gap'. The later is slower than the former but forbids any "
             * "gap in the sequence (while they are possible in the former).")
             * help="While assigning a sequence number to a record, the 'no gap' sequence implementation ensures that each previous sequence number has been assigned already. "
             * "While this sequence implementation will not skip any sequence number upon assignation, there can still be gaps in the sequence if records are deleted. "
             * "The 'no gap' implementation is slower than the standard one.")
             *
             * Legend (for prefix, suffix)
             * Current Year with Century: %(year)s
             * Current Year without Century: %(y)s
             * Month: %(month)s
             * Day: %(day)s
             *
             * Day of the Year: %(doy)s
             * Week of the Year: %(woy)s
             * Day of the Week (0:Monday): %(weekday)s
             *
             * Hour 00->24: %(h24)s
             * Hour 00->12: %(h12)s
             * Minute: %(min)s
             * Second: %(sec)s
             *
             */
            $table->id();
            $table->string('name');
            $table->string('sequence_code')->nullable();
            $table->string('implementation');
            $table->string('prefix')->nullable();
            $table->string('suffix')->nullable();
            $table->unsignedInteger('sequence_size')->default(6); // add zero on the left side of the next number for the padding side
            $table->unsignedInteger('step')->default(1); //  next number increment by this number
            $table->unsignedInteger('next_number')->default(0); // the next number of the current sequence
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sequences');
    }
}
