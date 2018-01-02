<?php

namespace App\Http\Controllers;

use App\Eatery;
use App\Http\Requests\StoreEatery;
use App\Http\Requests\UpdateEatery;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class EateryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index()
    {
        return Eatery::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEatery $request)
    {
        $eatery = Eatery::create($request->all());
        return response()->json($eatery, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Eatery
     */
    public function show(Eatery $eatery)
    {
        return $eatery;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Eatery  $eatery
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEatery $request, Eatery $eatery)
    {
        $eatery->update($request->all());
        return response()->json($eatery, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Eatery $eatery)
    {
        $eatery->delete();
        return response()->json(null, 204);
    }
}
