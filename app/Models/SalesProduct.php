<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed $id
 * @property string $name
 * @property string $product_type
 * @property bool $can_be_sold
 * @property bool $can_be_purchased
 * @property string $invoicing_policy
 * @property double $sales_price
 * @property double $cost
 * @property integer $measurement_id
 * @property integer $purchase_measurement_id
 * @property integer $sales_measurement_id
 * @property integer $product_category_id
 * @property string $internal_reference
 * @property string $avatar
 * @property string $sales_description
 * @property string $purchase_description
 * @property mixed $deleted_at
 * @property mixed $created_at
 * @property mixed $updated_at
 */
class SalesProduct extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'sales_products';


    /*
     *
     * TODO - refactor and remove constructor
     * */
    public function __construct(Product $product){
        parent::__construct();
        $this->id=$product->id;
        $this->name=$product->name;
        $this->product_type=$product->product_type;
        $this->can_be_sold=$product->can_be_sold;
        $this->can_be_purchased=$product->can_be_purchased;
        $this->invoicing_policy=$product->invoicing_policy;
        $this->sales_price=$product->sales_price;
        $this->cost=$product->cost;
        $this->measurement_id=$product->measurement_id;
        $this->purchase_measurement_id=$product->purchase_measurement_id;
        $this->sales_measurement_id=$product->sales_measurement_id;
        $this->product_category_id=$product->product_category_id;
        $this->internal_reference=$product->internal_reference;
        $this->avatar=$product->avatar;
        $this->sales_description=$product->sales_description;
        $this->purchase_description=$product->purchase_description;
        $this->deleted_at=$product->deleted_at;
        $this->created_at=$product->created_at;
        $this->updated_at=$product->updated_at;

    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getProductType(): string
    {
        return $this->product_type;
    }

    /**
     * @return bool
     */
    public function isCanBeSold(): bool
    {
        return $this->can_be_sold;
    }

    /**
     * @return bool
     */
    public function isCanBePurchased(): bool
    {
        return $this->can_be_purchased;
    }

    /**
     * @return string
     */
    public function getInvoicingPolicy(): string
    {
        return $this->invoicing_policy;
    }

    /**
     * @return float
     */
    public function getSalesPrice(): float
    {
        return $this->sales_price;
    }

    /**
     * @return float
     */
    public function getCost(): float
    {
        return $this->cost;
    }

    /**
     * @return int
     */
    public function getMeasurementId(): int
    {
        return $this->measurement_id;
    }

    /**
     * @return int
     */
    public function getPurchaseMeasurementId(): int
    {
        return $this->purchase_measurement_id;
    }

    /**
     * @return int
     */
    public function getSalesMeasurementId(): int
    {
        return $this->sales_measurement_id;
    }

    /**
     * @return int
     */
    public function getProductCategoryId(): int
    {
        return $this->product_category_id;
    }

    /**
     * @return string
     */
    public function getInternalReference(): string
    {
        return $this->internal_reference;
    }

    /**
     * @return string
     */
    public function getAvatar(): string
    {
        return $this->avatar;
    }

    /**
     * @return string
     */
    public function getSalesDescription(): string
    {
        return $this->sales_description;
    }

    /**
     * @return string
     */
    public function getPurchaseDescription(): string
    {
        return $this->purchase_description;
    }

    /**
     * @return mixed
     */
    public function getDeletedAt()
    {
        return $this->deleted_at;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }




}
