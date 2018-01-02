<?php

namespace Tests\Feature;

use App\Eatery;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EateryTest extends TestCase
{
    use DatabaseTransactions;

    public function testIndex()
    {
        $this->call('GET', '/api/eateries')->assertSuccessful();
    }

    public function testShow()
    {
        $eatery = Eatery::inRandomOrder()->first();
        $this->call('GET', "/api/eateries/{$eatery->id}")->assertSuccessful();
    }

    public function testStore()
    {
        $new = ['name' => "Tanyas Soup Kitchen"];
        $this->call('POST', '/api/eateries/', $new)->assertSuccessful();
    }

    public function testUpdate()
    {
        $update = ['name' => "Picassos East"];
        $eatery = Eatery::inRandomOrder()->first();
        $this->call('PUT', "/api/eateries/{$eatery->id}", $update)->assertSuccessful();
    }

    public function testDelete()
    {
        $eatery = Eatery::inRandomOrder()->first();
        $this->call('DELETE', "/api/eateries/{$eatery->id}")->assertSuccessful();
    }
}
